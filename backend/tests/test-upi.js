const { generateUPILink } = require('../services/upi');

const link = generateUPILink(
  'test@okaxis',
  50000,
  'INV-001',
  'Test Business'
);

console.log('UPI Link:', link);

// Expected output:
// upi://pay?pa=test@okaxis&pn=Test%20Business&am=50000&tn=Payment%20for%20INV-001&cu=INR