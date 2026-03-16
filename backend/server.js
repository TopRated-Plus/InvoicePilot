const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { startScheduler } = require('./services/scheduler');

dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/bills', require('./routes/bills'));
app.use('/api/clients', require('./routes/clients'));
app.use('/api/reminders', require('./routes/reminders'));
app.use('/pay', require('./routes/pay'));

// Health check
app.get('/', (req, res) => {
  res.json({ message: 'Payflo API running' });
});

// Start scheduler
startScheduler();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Payflo backend running on port ${PORT}`);
});