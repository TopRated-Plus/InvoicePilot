function generateUPILink(upiId, amount, invoiceNumber, businessName) {
  // Clean UPI ID
  const cleanUpiId = upiId.trim().toLowerCase();

  // Validate format
  const upiRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9]+$/;
  if (!upiRegex.test(cleanUpiId)) {
    throw new Error(`Invalid UPI ID format: ${cleanUpiId}`);
  }

  const upiLink = `upi://pay?pa=${cleanUpiId}&pn=${encodeURIComponent(businessName)}&am=${amount}&tn=${encodeURIComponent('Payment for ' + invoiceNumber)}&cu=INR`;
  return upiLink;
}

module.exports = { generateUPILink };