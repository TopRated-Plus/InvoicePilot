const cron = require('node-cron');
const { db } = require('./firebase');
const { sendEmailReminder } = require('./email');

function startScheduler() {
  // Runs every hour
  cron.schedule('0 * * * *', async () => {
    console.log('Scheduler running:', new Date().toISOString());

    try {
      // Get all pending and overdue bills
      const snapshot = await db.collection('bills')
        .where('status', 'in', ['pending', 'overdue'])
        .get();

      const today = new Date();

      for (const doc of snapshot.docs) {
        const bill = { id: doc.id, ...doc.data() };

        // Skip if max reminders reached
        if (bill.reminderCount >= 5) continue;

        // Skip if reminded in last 24 hours
        if (bill.lastReminderAt) {
          const lastReminder = bill.lastReminderAt.toDate();
          const hoursSince = (today - lastReminder) / (1000 * 60 * 60);
          if (hoursSince < 24) continue;
        }

        const dueDate = bill.dueDate.toDate();
        const daysUntilDue = Math.ceil((dueDate - today) / (1000 * 60 * 60 * 24));
        const daysSinceDue = Math.ceil((today - dueDate) / (1000 * 60 * 60 * 24));

        // Reminder schedule
        const shouldRemind = (
          daysUntilDue === 3  ||
          daysUntilDue === 0  ||
          daysSinceDue === 3  ||
          daysSinceDue === 7
        );

        if (!shouldRemind) continue;

        // Get user details
        const userDoc = await db.collection('users')
          .doc(bill.userId).get();
        const user = userDoc.data();

        if (!user) continue;

        // Send email reminder
        const sent = await sendEmailReminder({
          clientEmail: bill.clientEmail,
          clientName: bill.clientName,
          businessName: user.businessName,
          invoiceNumber: bill.invoiceNumber,
          amount: bill.amount,
          dueDate: bill.dueDate.toDate(),
          upiLink: bill.upiLink
        });

        if (sent) {
          // Log reminder
          await db.collection('reminders').add({
            billId: bill.id,
            userId: bill.userId,
            type: 'email',
            status: 'sent',
            message: `Auto reminder sent to ${bill.clientEmail}`,
            sentAt: new Date()
          });

          // Update bill
          await doc.ref.update({
            reminderCount: bill.reminderCount + 1,
            lastReminderAt: new Date(),
            status: daysSinceDue > 0 ? 'overdue' : 'pending'
          });

          console.log(`Reminder sent for bill ${bill.invoiceNumber}`);
        }
      }

    } catch (error) {
      console.error('Scheduler error:', error.message);
    }
  });

  console.log('Scheduler started');
}

module.exports = { startScheduler };