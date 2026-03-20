const { Resend } = require('resend');
require('dotenv').config();

const resend = new Resend(process.env.RESEND_API_KEY);

async function sendEmailReminder({
  billId,
  clientEmail,
  clientName,
  businessName,
  invoiceNumber,
  amount,
  dueDate,
  invoiceDate,
  upiLink,
  reminderCount = 0,
  interestRate = 0
}) {
  try {
    const now = new Date();
    const due = new Date(dueDate);
    const created = invoiceDate ? new Date(invoiceDate) : new Date();

    const daysOverdue = Math.floor((now - due) / (1000 * 60 * 60 * 24));
    const isOverdue = daysOverdue > 0;

    const formattedDueDate = due.toLocaleDateString('en-IN', {
      day: '2-digit', month: '2-digit', year: 'numeric'
    });

    const formattedInvoiceDate = created.toLocaleDateString('en-IN', {
      day: '2-digit', month: '2-digit', year: 'numeric'
    });

    const formattedAmount = new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);

    // Calculate interest if applicable
    const interestAmount = interestRate > 0 && isOverdue
      ? Math.round((amount * interestRate * daysOverdue) / (100 * 365))
      : 0;

    const totalDue = amount + interestAmount;

    const formattedTotal = new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(totalDue);

    // Dynamic subject line
    let subject = '';
    if (!isOverdue) {
      subject = `Payment Reminder — ${invoiceNumber} — ${formattedAmount} — Due ${formattedDueDate}`;
    } else if (daysOverdue <= 7) {
      subject = `OVERDUE — ${invoiceNumber} — ${clientName} — ${daysOverdue} Days Overdue`;
    } else if (daysOverdue <= 30) {
      subject = `URGENT: Payment Overdue ${daysOverdue} Days — ${invoiceNumber} — ${clientName}`;
    } else {
      subject = `FINAL NOTICE — ${invoiceNumber} — ${clientName} — ${daysOverdue} Days Overdue`;
    }

    // Dynamic header color and status
    const headerColor = !isOverdue ? '#00C27A'
      : daysOverdue <= 7 ? '#D97706'
      : '#DC2626';

    const statusText = !isOverdue ? 'Payment Reminder'
      : daysOverdue <= 7 ? `Overdue by ${daysOverdue} days`
      : `URGENT — ${daysOverdue} Days Overdue`;

    const statusBg = !isOverdue ? '#f0fdf4'
      : daysOverdue <= 7 ? '#fffbeb'
      : '#fef2f2';

    const statusColor = !isOverdue ? '#16a34a'
      : daysOverdue <= 7 ? '#d97706'
      : '#dc2626';

    const paymentUrl = `${process.env.BACKEND_URL}/pay/${billId}`;

    await resend.emails.send({
      from: `${businessName} <onboarding@resend.dev>`,
      to: clientEmail,
      subject,
      html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${subject}</title>
</head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:Arial,sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f5;padding:32px 16px;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width:520px;background:white;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.08);">

          <!-- HEADER -->
          <tr>
            <td style="background:${headerColor};padding:20px 32px;text-align:center;">
              <p style="margin:0;color:white;font-size:13px;opacity:0.85;">Payment reminder from</p>
              <h1 style="margin:4px 0 0;color:white;font-size:22px;font-weight:800;letter-spacing:-0.5px;">
                ${businessName}
              </h1>
            </td>
          </tr>

          <!-- STATUS BADGE -->
          <tr>
            <td style="padding:0 32px;">
              <div style="background:${statusBg};border:1px solid ${statusColor};border-radius:8px;padding:10px 16px;margin:20px 0 0;text-align:center;">
                <p style="margin:0;color:${statusColor};font-weight:700;font-size:14px;">
                  ${isOverdue ? '⚠️' : '🔔'} ${statusText}
                </p>
                ${isOverdue && interestRate > 0 ? `
                <p style="margin:4px 0 0;color:${statusColor};font-size:12px;">
                  Interest at ${interestRate}% p.a. is applicable on overdue amount
                </p>` : ''}
              </div>
            </td>
          </tr>

          <!-- GREETING -->
          <tr>
            <td style="padding:24px 32px 0;">
              <p style="margin:0;font-size:15px;color:#111827;">Hi <strong>${clientName}</strong>,</p>
              <p style="margin:10px 0 0;font-size:14px;color:#6b7280;line-height:1.6;">
                ${!isOverdue
                  ? `Hope all is well. This is a friendly reminder that the following invoice is due for payment.`
                  : daysOverdue <= 7
                  ? `This invoice is now <strong style="color:#d97706;">${daysOverdue} days overdue</strong>. We request you to clear this at your earliest convenience.`
                  : `Despite our previous reminders, this invoice remains unpaid for <strong style="color:#dc2626;">${daysOverdue} days</strong>. We urge immediate payment to avoid further action.`
                }
              </p>
            </td>
          </tr>

          <!-- INVOICE CARD -->
          <tr>
            <td style="padding:20px 32px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="background:#f9fafb;border-radius:10px;border:1px solid #e5e7eb;overflow:hidden;">

                <!-- Invoice Header -->
                <tr>
                  <td style="padding:14px 20px;border-bottom:1px solid #e5e7eb;">
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td>
                          <p style="margin:0;font-size:11px;color:#9ca3af;text-transform:uppercase;letter-spacing:0.08em;">Invoice</p>
                          <p style="margin:4px 0 0;font-size:15px;font-weight:700;color:#111827;">${invoiceNumber}</p>
                        </td>
                        <td align="right">
                          <span style="background:${statusBg};color:${statusColor};font-size:11px;font-weight:700;padding:4px 10px;border-radius:100px;border:1px solid ${statusColor};">
                            ${isOverdue ? 'OVERDUE' : 'PENDING'}
                          </span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- Amount -->
                <tr>
                  <td style="padding:16px 20px;border-bottom:1px solid #e5e7eb;text-align:center;">
                    <p style="margin:0;font-size:11px;color:#9ca3af;text-transform:uppercase;letter-spacing:0.08em;">Amount Due</p>
                    <p style="margin:6px 0 0;font-size:36px;font-weight:800;color:#00C27A;line-height:1;">${formattedAmount}</p>
                    ${interestAmount > 0 ? `
                    <p style="margin:6px 0 0;font-size:12px;color:#dc2626;">
                      + ₹${interestAmount.toLocaleString('en-IN')} interest (${interestRate}% p.a. for ${daysOverdue} days)
                    </p>
                    <p style="margin:4px 0 0;font-size:14px;font-weight:700;color:#dc2626;">
                      Total Payable: ${formattedTotal}
                    </p>` : ''}
                  </td>
                </tr>

                <!-- Dates Row -->
                <tr>
                  <td style="padding:0;">
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td width="50%" style="padding:14px 20px;border-right:1px solid #e5e7eb;${isOverdue ? 'border-bottom:none;' : ''}">
                          <p style="margin:0;font-size:11px;color:#9ca3af;text-transform:uppercase;letter-spacing:0.06em;">Invoice Date</p>
                          <p style="margin:4px 0 0;font-size:14px;font-weight:600;color:#111827;">${formattedInvoiceDate}</p>
                        </td>
                        <td width="50%" style="padding:14px 20px;">
                          <p style="margin:0;font-size:11px;color:#9ca3af;text-transform:uppercase;letter-spacing:0.06em;">Due Date</p>
                          <p style="margin:4px 0 0;font-size:14px;font-weight:600;color:${isOverdue ? '#dc2626' : '#111827'};">
                            ${formattedDueDate}${isOverdue ? ` <span style="color:#dc2626;font-size:12px;">(${daysOverdue}d overdue)</span>` : ''}
                          </p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

              </table>
            </td>
          </tr>

          <!-- PAY BUTTON -->
          <tr>
            <td style="padding:0 32px 24px;">
              <a href="${paymentUrl}"
                 style="display:block;background:${headerColor};color:white;text-align:center;padding:14px;border-radius:8px;text-decoration:none;font-size:16px;font-weight:700;">
                Pay ${formattedAmount} via UPI →
              </a>
              <p style="text-align:center;font-size:12px;color:#9ca3af;margin:8px 0 0;">
                Tap on mobile to open GPay, PhonePe, or any UPI app
              </p>
            </td>
          </tr>

          <!-- VIEW INVOICE LINK -->
          <tr>
            <td style="padding:0 32px 24px;text-align:center;">
              <a href="${paymentUrl}"
                 style="font-size:13px;color:#00C27A;text-decoration:none;font-weight:600;">
                📄 View Invoice Online →
              </a>
            </td>
          </tr>

          ${interestRate > 0 ? `
          <!-- INTEREST NOTE -->
          <tr>
            <td style="padding:0 32px 20px;">
              <div style="background:#fef2f2;border:1px solid #fecaca;border-radius:8px;padding:12px 16px;">
                <p style="margin:0;font-size:12px;color:#dc2626;line-height:1.5;">
                  <strong>Interest Notice:</strong> As per our payment terms, interest at 
                  <strong>${interestRate}% per annum</strong> is applicable on overdue amounts. 
                  ${isOverdue
                    ? `Current interest charges: ₹${interestAmount.toLocaleString('en-IN')} for ${daysOverdue} days.`
                    : 'Interest will apply if payment is not made by the due date.'}
                </p>
              </div>
            </td>
          </tr>` : ''}

          <!-- FOOTER -->
          <tr>
            <td style="padding:20px 32px;border-top:1px solid #f3f4f6;">
              <p style="margin:0;font-size:12px;color:#9ca3af;line-height:1.6;">
                If you have already made the payment, please ignore this message or reply to confirm.
                For any queries, simply reply to this email.
              </p>
              <p style="margin:12px 0 0;font-size:13px;color:#374151;">
                Thanks,<br>
                <strong>${businessName}</strong>
              </p>
            </td>
          </tr>

          <!-- POWERED BY -->
          <tr>
            <td style="padding:12px 32px;background:#f9fafb;text-align:center;border-top:1px solid #f3f4f6;">
              <p style="margin:0;font-size:11px;color:#d1d5db;">
                Sent via <strong style="color:#9ca3af;">Payflo</strong> — Automated payment collection for Indian businesses
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>

</body>
</html>
      `
    });

    console.log(`Email sent to ${clientEmail} — ${invoiceNumber}`);
    return true;

  } catch (error) {
    console.error('Email error:', error.message);
    return false;
  }
}

module.exports = { sendEmailReminder };