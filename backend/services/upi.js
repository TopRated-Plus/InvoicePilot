function generateUPILink(upiId, amount, invoiceNumber, businessName) {
  const upiLink = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(businessName)}&am=${amount}&tn=${encodeURIComponent('Payment for ' + invoiceNumber)}&cu=INR`;
  return upiLink;
}

module.exports = { generateUPILink };