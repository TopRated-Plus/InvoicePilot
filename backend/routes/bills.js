const express = require('express');
const router = express.Router();
const { db } = require('../services/firebase');
const { verifyToken } = require('../middleware/auth');
const { sendEmailReminder } = require('../services/email');
const { generateUPILink } = require('../services/upi');

// Get all bills
router.get('/', verifyToken, async (req, res) => {
  try {
    const uid = req.user.uid;
    const snapshot = await db.collection('bills')
      .where('userId', '==', uid)
      .orderBy('createdAt', 'desc')
      .get();

    const bills = [];
    snapshot.forEach(doc => {
      bills.push({ id: doc.id, ...doc.data() });
    });

    res.json(bills);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create new bill
router.post('/', verifyToken, async (req, res) => {
  try {
    const uid = req.user.uid;
    const {
      clientName,
      clientPhone,
      clientEmail,
      amount,
      description,
      dueDate
    } = req.body;

    // Get user profile
    const userDoc = await db.collection('users').doc(uid).get();
    const user = userDoc.data();

    if (!user) {
      return res.status(404).json({ error: 'User profile not found' });
    }

    // Generate invoice number
    const billsSnapshot = await db.collection('bills')
      .where('userId', '==', uid)
      .get();
    const invoiceNumber = `INV-${String(billsSnapshot.size + 1).padStart(3, '0')}`;

    // Generate UPI link
    const upiLink = generateUPILink(
      user.upiId,
      amount,
      invoiceNumber,
      user.businessName
    );

    // Save bill
    const billRef = await db.collection('bills').add({
      userId: uid,
      clientName,
      clientPhone,
      clientEmail,
      amount: Number(amount),
      description,
      dueDate: new Date(dueDate),
      invoiceNumber,
      upiLink,
      status: 'pending',
      reminderCount: 0,
      lastReminderAt: null,
      paidAt: null,
      createdAt: new Date()
    });

    // Send first email reminder immediately
    await sendEmailReminder({
      billId: billRef.id, 
      clientEmail,
      clientName,
      businessName: user.businessName,
      invoiceNumber,
      amount,
      dueDate,
      upiLink
    });

    // Log reminder
    await db.collection('reminders').add({
      billId: billRef.id,
      userId: uid,
      type: 'email',
      status: 'sent',
      message: `First reminder sent to ${clientEmail}`,
      sentAt: new Date()
    });

    // Update reminder count
    await billRef.update({
      reminderCount: 1,
      lastReminderAt: new Date()
    });

    res.json({
      id: billRef.id,
      invoiceNumber,
      message: 'Bill created and reminder sent'
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get single bill
router.get('/:id', verifyToken, async (req, res) => {
  try {
    const doc = await db.collection('bills')
      .doc(req.params.id).get();

    if (!doc.exists) {
      return res.status(404).json({ error: 'Bill not found' });
    }

    res.json({ id: doc.id, ...doc.data() });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Mark bill as paid
router.post('/:id/paid', verifyToken, async (req, res) => {
  try {
    await db.collection('bills').doc(req.params.id).update({
      status: 'paid',
      paidAt: new Date()
    });

    res.json({ message: 'Bill marked as paid' });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Send manual reminder
router.post('/:id/remind', verifyToken, async (req, res) => {
  try {
    const uid = req.user.uid;
    const doc = await db.collection('bills')
      .doc(req.params.id).get();
    const bill = doc.data();

    if (bill.status === 'paid') {
      return res.status(400).json({ error: 'Bill already paid' });
    }

    if (bill.reminderCount >= 5) {
      return res.status(400).json({ error: 'Maximum 5 reminders reached' });
    }

    const userDoc = await db.collection('users').doc(uid).get();
    const user = userDoc.data();

    await sendEmailReminder({
      billId: req.params.id,
      clientEmail: bill.clientEmail,
      clientName: bill.clientName,
      businessName: user.businessName,
      invoiceNumber: bill.invoiceNumber,
      amount: bill.amount,
      dueDate: bill.dueDate.toDate(),
      upiLink: bill.upiLink
    });

    await db.collection('reminders').add({
      billId: req.params.id,
      userId: uid,
      type: 'email',
      status: 'sent',
      message: `Manual reminder sent to ${bill.clientEmail}`,
      sentAt: new Date()
    });

    await doc.ref.update({
      reminderCount: bill.reminderCount + 1,
      lastReminderAt: new Date()
    });

    res.json({ message: 'Reminder sent successfully' });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete bill
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    await db.collection('bills')
      .doc(req.params.id).delete();

    res.json({ message: 'Bill deleted' });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;