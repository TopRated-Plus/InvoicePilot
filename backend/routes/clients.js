const express = require('express');
const router = express.Router();
const { db } = require('../services/firebase');
const { verifyToken } = require('../middleware/auth');

// Get all clients
router.get('/', verifyToken, async (req, res) => {
  try {
    const uid = req.user.uid;
    const snapshot = await db.collection('clients')
      .where('userId', '==', uid)
      .orderBy('createdAt', 'desc')
      .get();

    const clients = [];
    snapshot.forEach(doc => {
      clients.push({ id: doc.id, ...doc.data() });
    });

    res.json(clients);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create client
router.post('/', verifyToken, async (req, res) => {
  try {
    const uid = req.user.uid;
    const { name, phone, email } = req.body;

    const clientRef = await db.collection('clients').add({
      userId: uid,
      name,
      phone,
      email,
      totalBills: 0,
      totalPaid: 0,
      createdAt: new Date()
    });

    res.json({
      id: clientRef.id,
      message: 'Client created successfully'
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get single client with bills
router.get('/:id', verifyToken, async (req, res) => {
  try {
    const doc = await db.collection('clients')
      .doc(req.params.id).get();

    if (!doc.exists) {
      return res.status(404).json({ error: 'Client not found' });
    }

    // Get all bills for this client
    const billsSnapshot = await db.collection('bills')
      .where('userId', '==', req.user.uid)
      .where('clientEmail', '==', doc.data().email)
      .get();

    const bills = [];
    billsSnapshot.forEach(b => {
      bills.push({ id: b.id, ...b.data() });
    });

    res.json({
      id: doc.id,
      ...doc.data(),
      bills
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update client
router.put('/:id', verifyToken, async (req, res) => {
  try {
    const { name, phone, email } = req.body;

    await db.collection('clients')
      .doc(req.params.id).update({
        name,
        phone,
        email,
        updatedAt: new Date()
      });

    res.json({ message: 'Client updated successfully' });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete client
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    await db.collection('clients')
      .doc(req.params.id).delete();

    res.json({ message: 'Client deleted successfully' });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;