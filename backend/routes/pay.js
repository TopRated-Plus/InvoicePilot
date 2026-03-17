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

    // Extract UPI ID
    const upiUrl = new URL(bill.upiLink.replace('upi://', 'http://upi/'));
    const pa = upiUrl.searchParams.get('pa') || '';
    const am = bill.amount;

    const amount = new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(bill.amount);

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
            padding: 20px 16px;
            background: #f9fafb;
          }
          .card {
            background: white;
            border-radius: 12px;
            padding: 24px;
            margin-bottom: 12px;
            border: 1px solid #e5e7eb;
            text-align: center;
          }
          .amount {
            font-size: 44px;
            font-weight: bold;
            color: #16a34a;
            margin: 8px 0;
          }
          .upi-box {
            background: #f0fdf4;
            border: 1.5px dashed #16a34a;
            border-radius: 10px;
            padding: 16px;
            margin: 16px 0;
            text-align: center;
          }
          .upi-label {
            font-size: 12px;
            color: #6b7280;
            margin-bottom: 6px;
          }
          .upi-id {
            font-size: 22px;
            font-weight: bold;
            color: #111827;
            letter-spacing: 0.5px;
          }
          .copy-btn {
            background: #16a34a;
            color: white;
            border: none;
            padding: 8px 20px;
            border-radius: 6px;
            font-size: 13px;
            margin-top: 10px;
            cursor: pointer;
            font-weight: bold;
          }
          .steps {
            background: white;
            border-radius: 12px;
            padding: 20px;
            margin-bottom: 12px;
            border: 1px solid #e5e7eb;
          }
          .step {
            display: flex;
            align-items: flex-start;
            gap: 12px;
            margin-bottom: 14px;
          }
          .step:last-child { margin-bottom: 0; }
          .step-num {
            background: #16a34a;
            color: white;
            width: 24px;
            height: 24px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 12px;
            font-weight: bold;
            flex-shrink: 0;
          }
          .step-text {
            font-size: 14px;
            color: #374151;
            line-height: 1.5;
          }
          .step-bold {
            font-weight: bold;
            color: #111827;
          }
          .info-row {
            display: flex;
            justify-content: space-between;
            padding: 8px 0;
            border-bottom: 1px solid #f3f4f6;
            font-size: 14px;
          }
          .info-row:last-child { border-bottom: none; }
          .info-label { color: #6b7280; }
          .info-value { font-weight: 600; color: #111827; }
        </style>
      </head>
      <body>

        <div class="card">
          <div style="font-size:13px;color:#6b7280;">Pay to</div>
          <div style="font-size:18px;font-weight:bold;color:#111827;margin:4px 0;">
            ${bill.userId}
          </div>
          <div class="amount">${amount}</div>
          <div style="font-size:13px;color:#6b7280;">${bill.invoiceNumber}</div>
        </div>

        <div class="card">
          <div style="font-size:13px;font-weight:600;color:#374151;margin-bottom:12px;">
            Invoice Details
          </div>
          <div class="info-row">
            <span class="info-label">Invoice</span>
            <span class="info-value">${bill.invoiceNumber}</span>
          </div>
          <div class="info-row">
            <span class="info-label">Amount</span>
            <span class="info-value" style="color:#16a34a;">${amount}</span>
          </div>
          <div class="info-row">
            <span class="info-label">Description</span>
            <span class="info-value">${bill.description || '-'}</span>
          </div>
        </div>

        <div class="upi-box">
          <div class="upi-label">UPI ID — Send money to this ID</div>
          <div class="upi-id" id="upiId">${pa}</div>
          <div style="font-size:13px;color:#16a34a;margin-top:4px;">
            Amount: <strong>₹${am}</strong>
          </div>
          <button class="copy-btn" onclick="copyUPI()">
            Copy UPI ID
          </button>
        </div>

        <div class="steps">
          <div style="font-size:13px;font-weight:600;color:#374151;margin-bottom:14px;">
            How to pay in 3 steps
          </div>
          <div class="step">
            <div class="step-num">1</div>
            <div class="step-text">
              Open <span class="step-bold">GPay, PhonePe, Paytm</span> 
              or any UPI app on your phone
            </div>
          </div>
          <div class="step">
            <div class="step-num">2</div>
            <div class="step-text">
              Tap <span class="step-bold">Send Money</span> → 
              <span class="step-bold">UPI ID</span> and paste:
              <br>
              <span style="background:#f3f4f6;padding:4px 8px;border-radius:4px;font-family:monospace;font-size:13px;">${pa}</span>
            </div>
          </div>
          <div class="step">
            <div class="step-num">3</div>
            <div class="step-text">
              Enter amount <span class="step-bold">₹${am}</span> 
              and your <span class="step-bold">UPI PIN</span> to pay
            </div>
          </div>
        </div>

        <p style="font-size:12px;color:#9ca3af;text-align:center;line-height:1.6;">
          Payment goes directly to the business.<br>
          Keep your UPI PIN confidential.
        </p>

        <script>
        function copyUPI() {
          const upiId = document.getElementById('upiId').innerText;
          const btn = document.querySelector('.copy-btn');
      
          // Method 1 - Modern clipboard API
          if (navigator.clipboard && window.isSecureContext) {
            navigator.clipboard.writeText(upiId).then(() => {
              btn.innerText = 'Copied!';
              btn.style.background = '#15803d';
              setTimeout(() => {
                btn.innerText = 'Copy UPI ID';
                btn.style.background = '#16a34a';
              }, 2000);
            });
            return;
          }
      
          // Method 2 - Fallback for HTTP
          const el = document.createElement('textarea');
          el.value = upiId;
          el.style.position = 'fixed';
          el.style.left = '-9999px';
          el.style.top = '-9999px';
          document.body.appendChild(el);
          el.focus();
          el.select();
      
          try {
            document.execCommand('copy');
            btn.innerText = 'Copied!';
            btn.style.background = '#15803d';
            setTimeout(() => {
              btn.innerText = 'Copy UPI ID';
              btn.style.background = '#16a34a';
            }, 2000);
          } catch (err) {
            btn.innerText = 'Copy manually';
          }
      
          document.body.removeChild(el);
        }
      </script>

      </body>
      </html>
    `);

  } catch (error) {
    console.error('Pay page error:', error);
    res.status(500).send('Error: ' + error.message);
  }
});

module.exports = router;
