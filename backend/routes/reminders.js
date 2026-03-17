const express = require('express');
const router = express.Router();
const { db } = require('../services/firebase');
const { verifyToken } = require('../middleware/auth');

// Get reminder history for a bill
router.get('/:billId', verifyToken, async (req, res) => {
  try {
    const snapshot = await db.collection('reminders')
      .where('billId', '==', req.params.billId)
      // .orderBy('sentAt', 'desc')
      .get();

    const reminders = [];
    snapshot.forEach(doc => {
      reminders.push({ id: doc.id, ...doc.data() });
    });

    res.json(reminders);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;