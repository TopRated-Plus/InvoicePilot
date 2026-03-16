const express = require('express');
const router = express.Router();
const { db } = require('../services/firebase');
const { verifyToken } = require('../middleware/auth');

// Save user profile after Firebase signup
router.post('/register', verifyToken, async (req, res) => {
  try {
    const { name, businessName, phone, upiId } = req.body;
    const uid = req.user.uid;

    await db.collection('users').doc(uid).set({
      uid,
      name,
      businessName,
      phone,
      upiId,
      email: req.user.email,
      plan: 'starter',
      createdAt: new Date()
    });

    res.json({ message: 'User registered successfully' });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get current user profile
router.get('/me', verifyToken, async (req, res) => {
  try {
    const uid = req.user.uid;
    const doc = await db.collection('users').doc(uid).get();

    if (!doc.exists) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(doc.data());

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update user profile
router.put('/me', verifyToken, async (req, res) => {
  try {
    const uid = req.user.uid;
    const { name, businessName, phone, upiId } = req.body;

    await db.collection('users').doc(uid).update({
      name,
      businessName,
      phone,
      upiId,
      updatedAt: new Date()
    });

    res.json({ message: 'Profile updated successfully' });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;