const express = require('express');
const router = express.Router();
const { db } = require('../services/firebase');

// Public payment page — no auth needed
router.get('/:billId', async (req, res) => {
  try {
    const doc = await db.collection('bills')
      .doc(req.params.billId).get();

    if (!doc.exists) {
      return res.status(404).send('Bill not found');
    }

    const bill = doc.data();

    if (bill.status === 'paid') {
      return res.send(`
        <html>
          <head>
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <title>Already Paid</title>
          </head>
          <body style="font-family:Arial;text-align:center;padding:40px;">
            <h2 style="color:#16a34a;">✓ Already Paid</h2>
            <p>This invoice has been paid. Thank you.</p>
          </body>
        </html>
      `);
    }

    const upiLink = bill.upiLink;
    const amount = new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(bill.amount);

    // Auto redirect to UPI app on mobile
    res.send(`
      <html>
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <title>Pay ${amount}</title>
          <style>
            body { font-family: Arial, sans-serif; max-width: 400px; margin: 40px auto; padding: 20px; text-align: center; }
            .amount { font-size: 32px; font-weight: bold; color: #16a34a; margin: 20px 0; }
            .btn { display: block; background: #16a34a; color: white; padding: 16px; border-radius: 8px; text-decoration: none; font-size: 18px; font-weight: bold; margin: 20px 0; }
            .info { font-size: 13px; color: #6b7280; margin-top: 16px; }
          </style>
        </head>
        <body>
          <p style="color:#6b7280;">Payment to</p>
          <h2>${bill.userId}</h2>
          <p style="color:#6b7280;">Invoice ${bill.invoiceNumber}</p>
          <div class="amount">${amount}</div>
          
          <a href="${upiLink}" class="btn">
            Pay via UPI
          </a>

          <div style="display:flex; gap:10px; justify-content:center; margin:20px 0;">
            <a href="${upiLink.replace('upi://', 'gpay://')}" 
               style="padding:10px 16px; border:1px solid #e5e7eb; border-radius:6px; text-decoration:none; color:#374151; font-size:14px;">
              GPay
            </a>
            <a href="${upiLink.replace('upi://', 'phonepe://')}"
               style="padding:10px 16px; border:1px solid #e5e7eb; border-radius:6px; text-decoration:none; color:#374151; font-size:14px;">
              PhonePe
            </a>
            <a href="${upiLink.replace('upi://', 'paytmmp://')}"
               style="padding:10px 16px; border:1px solid #e5e7eb; border-radius:6px; text-decoration:none; color:#374151; font-size:14px;">
              Paytm
            </a>
          </div>

          <p class="info">
            Open this page on your mobile phone<br>
            to pay directly via UPI
          </p>
        </body>
      </html>
    `);

  } catch (error) {
    res.status(500).send('Error loading payment page');
  }
});

module.exports = router;