const { sendEmailReminder } = require('../services/email');

async function test() {
  const result = await sendEmailReminder({
    clientEmail: 'madhavkarthickk.1212@gmail.com',
    clientName: 'Test Client',
    businessName: 'Test Business',
    invoiceNumber: 'INV-001',
    amount: 50000,
    dueDate: new Date(),
    upiLink: 'upi://pay?pa=test@okaxis&am=50000'
  });

  console.log('Email sent:', result);
}

test();