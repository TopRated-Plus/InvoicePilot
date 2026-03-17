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
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body { 
            font-family: Arial, sans-serif; 
            max-width: 420px; 
            margin: 0 auto; 
            padding: 24px 16px;
            background: #f9fafb;
            min-height: 100vh;
          }
          .card {
            background: white;
            border-radius: 12px;
            padding: 24px;
            margin-bottom: 16px;
            border: 1px solid #e5e7eb;
            text-align: center;
          }
          .label { font-size: 13px; color: #6b7280; margin-bottom: 4px; }
          .business { font-size: 18px; font-weight: bold; color: #111827; margin-bottom: 16px; }
          .amount { 
            font-size: 40px; 
            font-weight: bold; 
            color: #16a34a; 
            margin: 12px 0;
          }
          .invoice { font-size: 13px; color: #6b7280; }
          .section-title {
            font-size: 13px;
            font-weight: 600;
            color: #6b7280;
            margin-bottom: 12px;
            text-transform: uppercase;
            letter-spacing: 0.05em;
          }
          .btn {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
            width: 100%;
            padding: 14px;
            border-radius: 10px;
            text-decoration: none;
            font-size: 16px;
            font-weight: bold;
            margin-bottom: 10px;
            border: none;
            cursor: pointer;
          }
          .btn-gpay { 
            background: white; 
            color: #202124; 
            border: 1.5px solid #e5e7eb; 
          }
          .btn-phonepe { 
            background: #5f259f; 
            color: white; 
          }
          .btn-paytm { 
            background: #002970; 
            color: white; 
          }
          .btn-bhim {
            background: #004c8f;
            color: white;
          }
          .hint {
            font-size: 12px;
            color: #9ca3af;
            text-align: center;
            margin-top: 16px;
            line-height: 1.5;
          }
        </style>
      </head>
      <body>
        <div class="card">
          <div class="label">Payment to</div>
          <div class="business">${bill.userId}</div>
          <div class="amount">${amount}</div>
          <div class="invoice">${bill.invoiceNumber} · ${bill.description || ''}</div>
        </div>
    
        <div style="background:white; border-radius:12px; padding:20px; border:1px solid #e5e7eb;">
          <div class="section-title">Choose Payment App</div>
    
          <a href="gpay://upi/pay?pa=${bill.upiLink.split('pa=')[1]?.split('&')[0]}&pn=${encodeURIComponent(bill.userId)}&am=${bill.amount}&tn=${encodeURIComponent(bill.invoiceNumber)}&cu=INR" 
             class="btn btn-gpay">
            Google Pay
          </a>
    
          <a href="phonepe://pay?pa=${bill.upiLink.split('pa=')[1]?.split('&')[0]}&pn=${encodeURIComponent(bill.userId)}&am=${bill.amount}&tn=${encodeURIComponent(bill.invoiceNumber)}&cu=INR"
             class="btn btn-phonepe">
            PhonePe
          </a>
    
          <a href="paytmmp://pay?pa=${bill.upiLink.split('pa=')[1]?.split('&')[0]}&pn=${encodeURIComponent(bill.userId)}&am=${bill.amount}&tn=${encodeURIComponent(bill.invoiceNumber)}&cu=INR"
             class="btn btn-paytm">
            Paytm
          </a>
    
          <a href="upi://pay?pa=${bill.upiLink.split('pa=')[1]?.split('&')[0]}&pn=${encodeURIComponent(bill.userId)}&am=${bill.amount}&tn=${encodeURIComponent(bill.invoiceNumber)}&cu=INR"
             class="btn btn-bhim">
            Other UPI App
          </a>
    
        </div>
    
        <p class="hint">
          Amount will be pre-filled automatically.<br>
          Just enter your UPI PIN to complete payment.
        </p>
    
      </body>
      </html>
    `);

  } catch (error) {
    res.status(500).send('Error loading payment page');
  }
});

module.exports = router;