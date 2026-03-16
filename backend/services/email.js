const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD
  }
});

async function sendEmailReminder({
  billId,
  clientEmail,
  clientName,
  businessName,
  invoiceNumber,
  amount,
  dueDate,
  upiLink
}) {
  try {
    const formattedDate = new Date(dueDate).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });

    const formattedAmount = new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(amount);
    const mailOptions = {
      from: `${businessName} <${process.env.GMAIL_USER}>`,
      to: clientEmail,
      subject: `Payment Reminder — ${invoiceNumber} — ${formattedAmount}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto; padding: 20px;">
          
          <h2 style="color: #16a34a; margin-bottom: 4px;">Payment Reminder</h2>
          <p style="color: #6b7280; font-size: 14px;">from ${businessName}</p>
          
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;">
          
          <p style="font-size: 15px;">Hi ${clientName},</p>
          <p style="font-size: 14px; color: #374151;">
            This is a reminder for your pending payment.
          </p>
          
          <div style="background: #f9fafb; border-radius: 8px; padding: 16px; margin: 20px 0;">
            <table style="width: 100%; font-size: 14px;">
              <tr>
                <td style="color: #6b7280; padding: 4px 0;">Invoice Number</td>
                <td style="font-weight: bold; text-align: right;">${invoiceNumber}</td>
              </tr>
              <tr>
                <td style="color: #6b7280; padding: 4px 0;">Amount Due</td>
                <td style="font-weight: bold; text-align: right; color: #16a34a; font-size: 18px;">${formattedAmount}</td>
              </tr>
              <tr>
                <td style="color: #6b7280; padding: 4px 0;">Due Date</td>
                <td style="font-weight: bold; text-align: right;">${formattedDate}</td>
              </tr>
            </table>
          </div>
    
          <a href="${process.env.BACKEND_URL}/pay/${billId}"
             style="display: block; background: #16a34a; color: white; text-align: center; padding: 14px; border-radius: 8px; text-decoration: none; font-size: 16px; font-weight: bold; margin: 20px 0;">
            Pay ${formattedAmount} via UPI
          </a>
    
          <p style="font-size: 12px; color: #9ca3af; text-align: center;">
            Tap the button above on your mobile to open GPay, PhonePe or any UPI app
          </p>
    
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;">
          
          <p style="font-size: 12px; color: #9ca3af;">
            If you have already made the payment, please ignore this message.
          </p>
          <p style="font-size: 13px; color: #374151;">
            Thank you,<br>
            <strong>${businessName}</strong>
          </p>
    
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${clientEmail}`);
    return true;

  } catch (error) {
    console.error('Email send error:', error.message);
    return false;
  }
}

module.exports = { sendEmailReminder };