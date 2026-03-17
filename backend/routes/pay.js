const express = require('express');
const router = express.Router();
const { db } = require('../services/firebase');

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
        <body style="font-family:Arial;text-align:center;padding:40px;background:#f9fafb;">
          <div style="background:white;border-radius:12px;padding:32px;max-width:400px;margin:0 auto;border:1px solid #e5e7eb;">
            <div style="font-size:48px;margin-bottom:16px;">✅</div>
            <h2 style="color:#16a34a;">Payment Complete</h2>
            <p style="color:#6b7280;margin-top:8px;">This invoice has been paid. Thank you.</p>
          </div>
        </body>
        </html>
      `);
    }

    // Extract UPI ID cleanly from upiLink
    const upiUrl = new URL(bill.upiLink.replace('upi://', 'http://upi/'));
    const pa = upiUrl.searchParams.get('pa') || '';
    const pn = encodeURIComponent(bill.userId || '');
    const am = bill.amount;
    const tn = encodeURIComponent(bill.invoiceNumber || '');
    const cu = 'INR';

    const amount = new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(bill.amount);

    // Build individual app links
    const params = `pa=${pa}&pn=${pn}&am=${am}&tn=${tn}&cu=${cu}`;
    const gpayLink = `gpay://upi/pay?${params}`;
    const phonepeLink = `phonepe://pay?${params}`;
    const paytmLink = `paytmmp://pay?${params}`;
    const bhimLink = `upi://pay?${params}`;

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
          .label { 
            font-size: 13px; 
            color: #6b7280; 
            margin-bottom: 4px; 
          }
          .business { 
            font-size: 18px; 
            font-weight: bold; 
            color: #111827; 
            margin-bottom: 8px; 
          }
          .amount { 
            font-size: 40px; 
            font-weight: bold; 
            color: #16a34a; 
            margin: 12px 0;
          }
          .upi-id {
            font-size: 13px;
            color: #6b7280;
            background: #f3f4f6;
            padding: 6px 12px;
            border-radius: 20px;
            display: inline-block;
            margin-top: 8px;
          }
          .invoice { 
            font-size: 13px; 
            color: #6b7280;
            margin-top: 4px;
          }
          .section-title {
            font-size: 13px;
            font-weight: 600;
            color: #6b7280;
            margin-bottom: 12px;
            text-transform: uppercase;
            letter-spacing: 0.05em;
          }
          .btn {
            display: block;
            width: 100%;
            padding: 14px;
            border-radius: 10px;
            text-decoration: none;
            font-size: 16px;
            font-weight: bold;
            margin-bottom: 10px;
            text-align: center;
          }
          .btn-gpay { 
            background: white; 
            color: #202124; 
            border: 1.5px solid #dadce0; 
          }
          .btn-phonepe { 
            background: #5f259f; 
            color: white; 
          }
          .btn-paytm { 
            background: #002970; 
            color: white; 
          }
          .btn-other {
            background: #f3f4f6;
            color: #374151;
          }
          .hint {
            font-size: 12px;
            color: #9ca3af;
            text-align: center;
            margin-top: 16px;
            line-height: 1.6;
          }
        </style>
      </head>
      <body>

        <div class="card">
          <div class="label">Payment to</div>
          <div class="business">${bill.userId}</div>
          <div class="upi-id">${pa}</div>
          <div class="amount">${amount}</div>
          <div class="invoice">${bill.invoiceNumber}</div>
          ${bill.description ? `<div class="invoice">${bill.description}</div>` : ''}
        </div>

        <div style="background:white; border-radius:12px; padding:20px; border:1px solid #e5e7eb;">
          <div class="section-title">Pay with</div>

          <a href="${gpayLink}" class="btn btn-gpay">
            Google Pay
          </a>

          <a href="${phonepeLink}" class="btn btn-phonepe">
            PhonePe
          </a>

          <a href="${paytmLink}" class="btn btn-paytm">
            Paytm
          </a>

          <a href="${bhimLink}" class="btn btn-other">
            Other UPI App
          </a>

        </div>

        <p class="hint">
          UPI ID: ${pa}<br>
          Amount ₹${am} will be filled automatically.<br>
          Just enter your PIN to pay.
        </p>

      </body>
      </html>
    `);

  } catch (error) {
    console.error('Pay page error:', error);
    res.status(500).send('Error: ' + error.message);
  }
});

module.exports = router;