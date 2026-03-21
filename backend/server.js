const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { startScheduler } = require('./services/scheduler');

dotenv.config();

const app = express();

app.use(cors({
  origin: true,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

app.use('/api/auth', require('./routes/auth'));
app.use('/api/bills', require('./routes/bills'));
app.use('/api/clients', require('./routes/clients'));
app.use('/api/reminders', require('./routes/reminders'));
app.use('/pay', require('./routes/pay'));

app.get('/', (req, res) => {
  res.json({ message: 'Payflo API running' });
});

startScheduler();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Payflo backend running on port ${PORT}`);
});

// Self ping every 30 seconds — only in production
if (process.env.NODE_ENV === 'Production' || process.env.BACKEND_URL?.includes('onrender.com')) {
  setInterval(async () => {
    try {
      const url = process.env.BACKEND_URL || 'https://payflo-backend.onrender.com';
      await fetch(url + '/');
      console.log('Keep alive ping sent');
    } catch (e) {}
  }, 30 * 1000);
}