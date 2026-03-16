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
      text: `
Hi ${clientName},

This is a reminder for your pending payment.

Invoice Number : ${invoiceNumber}
Amount Due     : ${formattedAmount}
Due Date       : ${formattedDate}

Pay instantly via UPI:
${upiLink}

Open this link on your mobile to pay directly 
through GPay, PhonePe, or any UPI app.

If you have already made the payment, 
please ignore this message.

Thank you,
${businessName}
      `.trim()
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