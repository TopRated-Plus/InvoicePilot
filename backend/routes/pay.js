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

    // Extract UPI ID cleanly
    const upiUrl = new URL(bill.upiLink.replace('upi://', 'http://upi/'));
    const pa = upiUrl.searchParams.get('pa') || '';
    const am = bill.amount;
    const tn = encodeURIComponent(bill.invoiceNumber || '');
    const pn = encodeURIComponent(bill.userId || '');

    const amount = new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(bill.amount);

    // UPI links for each app
    const params = `pa=${pa}&pn=${pn}&am=${am}&tn=${tn}&cu=INR`;
    const upiDeepLink = `upi://pay?${params}`;
    const gpayLink = `gpay://upi/pay?${params}`;
    const phonepeLink = `phonepe://pay?${params}`;
    const paytmLink = `paytmmp://pay?${params}`;

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
            padding: 20px;
            margin-bottom: 12px;
            border: 1px solid #e5e7eb;
          }
          .amount {
            font-size: 44px;
            font-weight: bold;
            color: #16a34a;
            margin: 8px 0;
            text-align: center;
          }
          .upi-box {
            background: #f0fdf4;
            border: 1.5px dashed #16a34a;
            border-radius: 10px;
            padding: 16px;
            margin: 4px 0 12px 0;
            text-align: center;
          }
          .upi-id {
            font-size: 20px;
            font-weight: bold;
            color: #111827;
            letter-spacing: 0.5px;
            margin: 6px 0;
            word-break: break-all;
          }
          .copy-btn {
            background: #16a34a;
            color: white;
            border: none;
            padding: 10px 24px;
            border-radius: 6px;
            font-size: 14px;
            margin-top: 10px;
            cursor: pointer;
            font-weight: bold;
            width: 100%;
          }
          .app-btn {
            display: block;
            width: 100%;
            padding: 14px;
            border-radius: 10px;
            text-decoration: none;
            font-size: 15px;
            font-weight: bold;
            margin-bottom: 10px;
            text-align: center;
            border: none;
            cursor: pointer;
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
          .btn-upi {
            background: #f3f4f6;
            color: #374151;
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
            margin-top: 2px;
          }
          .step-text {
            font-size: 14px;
            color: #374151;
            line-height: 1.5;
          }
          .info-row {
            display: flex;
            justify-content: space-between;
            padding: 8px 0;
            border-bottom: 1px solid #f3f4f6;
            font-size: 14px;
          }
          .info-row:last-child { border-bottom: none; }
          .tip {
            background: #fef3c7;
            border: 1px solid #f59e0b;
            border-radius: 8px;
            padding: 10px 14px;
            font-size: 13px;
            color: #92400e;
            margin-bottom: 12px;
            text-align: center;
          }
        </style>
      </head>
      <body>

        <div class="tip">
          📱 For best experience open this link in <strong>Chrome browser</strong>
        </div>

        <div class="card" style="text-align:center;">
          <div style="font-size:13px;color:#6b7280;">Pay to</div>
          <div style="font-size:17px;font-weight:bold;color:#111827;margin:4px 0;">
            ${bill.userId}
          </div>
          <div class="amount">${amount}</div>
          <div style="font-size:13px;color:#6b7280;">${bill.invoiceNumber}</div>
          ${bill.description ? `<div style="font-size:13px;color:#6b7280;margin-top:2px;">${bill.description}</div>` : ''}
        </div>

        <div class="card">
          <div style="font-size:13px;font-weight:600;color:#374151;margin-bottom:10px;">
            Invoice Details
          </div>
          <div class="info-row">
            <span style="color:#6b7280;">Invoice</span>
            <span style="font-weight:600;">${bill.invoiceNumber}</span>
          </div>
          <div class="info-row">
            <span style="color:#6b7280;">Amount Due</span>
            <span style="font-weight:600;color:#16a34a;">${amount}</span>
          </div>
          <div class="info-row">
            <span style="color:#6b7280;">Description</span>
            <span style="font-weight:600;">${bill.description || '-'}</span>
          </div>
        </div>

        <div class="card">
          <div style="font-size:13px;font-weight:600;color:#374151;margin-bottom:12px;">
            Pay directly via UPI app
          </div>

          <a href="${gpayLink}"
             onclick="openUPI('${gpayLink}', event)"
             class="app-btn btn-gpay">
            Google Pay
          </a>

          <a href="${phonepeLink}"
             onclick="openUPI('${phonepeLink}', event)"
             class="app-btn btn-phonepe">
            PhonePe
          </a>

          <a href="${paytmLink}"
             onclick="openUPI('${paytmLink}', event)"
             class="app-btn btn-paytm">
            Paytm
          </a>

          <a href="${upiDeepLink}"
             onclick="openUPI('${upiDeepLink}', event)"
             class="app-btn btn-upi">
            Other UPI App
          </a>
        </div>

        <div class="upi-box">
          <div style="font-size:12px;color:#6b7280;margin-bottom:4px;">
            Or copy UPI ID and pay manually
          </div>
          <div class="upi-id" id="upiId">${pa.trim()}</div>
          <div style="font-size:13px;color:#16a34a;margin-top:6px;">
            Enter amount: <strong>₹${am}</strong>
          </div>
          <button class="copy-btn" onclick="copyUPI()">
            Copy UPI ID
          </button>
        </div>

        <div class="card">
          <div style="font-size:13px;font-weight:600;color:#374151;margin-bottom:14px;">
            How to pay manually
          </div>
          <div class="step">
            <div class="step-num">1</div>
            <div class="step-text">
              Open <strong>GPay, PhonePe or Paytm</strong>
            </div>
          </div>
          <div class="step">
            <div class="step-num">2</div>
            <div class="step-text">
              Tap <strong>Send Money → UPI ID</strong><br>
              Paste: <span style="background:#f3f4f6;padding:3px 8px;border-radius:4px;font-family:monospace;">${pa}</span>
            </div>
          </div>
          <div class="step">
            <div class="step-num">3</div>
            <div class="step-text">
              Enter amount <strong>₹${am}</strong> and your UPI PIN
            </div>
          </div>
        </div>

        <p style="font-size:12px;color:#9ca3af;text-align:center;line-height:1.6;margin-bottom:24px;">
          Payment goes directly to the business.<br>
          Keep your UPI PIN confidential.
        </p>

        <script>
          function openUPI(url, e) {
            e.preventDefault();
            window.location.href = url;
            setTimeout(function() {
              if (!document.hidden) {
                document.getElementById('fallback').style.display = 'block';
              }
            }, 2500);
          }

          function copyUPI() {
            // Get and clean UPI ID
            const raw = document.getElementById('upiId').innerText;
            const upiId = raw.trim().replace(/\s+/g, '').replace(/\n/g, '');
            const btn = document.querySelector('.copy-btn');
          
            // Validate UPI ID format before copying
            const upiRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9]+$/;
            if (!upiRegex.test(upiId)) {
              btn.innerText = 'Invalid UPI ID!';
              btn.style.background = '#dc2626';
              setTimeout(() => {
                btn.innerText = 'Copy UPI ID';
                btn.style.background = '#16a34a';
              }, 2000);
              return;
            }
          
            // Method 1 — Modern clipboard API (HTTPS)
            if (navigator.clipboard && window.isSecureContext) {
              navigator.clipboard.writeText(upiId).then(() => {
                showCopied(btn, upiId);
              }).catch(() => {
                fallbackCopy(upiId, btn);
              });
              return;
            }
          
            // Method 2 — Fallback (HTTP)
            fallbackCopy(upiId, btn);
          }
          
          function fallbackCopy(upiId, btn) {
            const el = document.createElement('textarea');
            el.value = upiId;
            el.style.position = 'fixed';
            el.style.left = '-9999px';
            el.style.top = '-9999px';
            el.setAttribute('readonly', '');
            document.body.appendChild(el);
            el.focus();
            el.select();
            el.setSelectionRange(0, 99999);
          
            try {
              const success = document.execCommand('copy');
              if (success) {
                showCopied(btn, upiId);
              } else {
                showManual(btn);
              }
            } catch (err) {
              showManual(btn);
            }
          
            document.body.removeChild(el);
          }
          
          function showCopied(btn, upiId) {
            btn.innerText = '✓ Copied: ' + upiId;
            btn.style.background = '#15803d';
            setTimeout(() => {
              btn.innerText = 'Copy UPI ID';
              btn.style.background = '#16a34a';
            }, 3000);
          }
          
          function showManual(btn) {
            btn.innerText = 'Long press UPI ID to copy';
            btn.style.background = '#854d0e';
            setTimeout(() => {
              btn.innerText = 'Copy UPI ID';
              btn.style.background = '#16a34a';
            }, 3000);
          }
        </script>

        <div id="fallback" style="display:none;background:#fef3c7;border:1px solid #f59e0b;border-radius:8px;padding:12px;margin-bottom:16px;font-size:13px;color:#92400e;text-align:center;">
          App not installed? Copy the UPI ID above and pay manually.
        </div>

      </body>
      </html>
    `);

  } catch (error) {
    console.error('Pay page error:', error);
    res.status(500).send('Error: ' + error.message);
  }
});

module.exports = router;