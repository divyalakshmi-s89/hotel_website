const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});
app.use('/api/', limiter);

// Routes
app.use('/api/orders', require('./routes/orderRoutes'));
app.use('/api/reviews', require('./routes/reviewRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));
app.use('/api/contact', require('./routes/contactRoutes'));
app.use('/api/festival', require('./routes/festivalRoutes'));

// Health check
app.get('/', (req, res) => {
  res.json({ message: '🍛 Jeya Hotel API is running!', status: 'OK' });
});

// Use local MongoDB if MONGODB_URI is missing or still has placeholder
const MONGO_URI =
  process.env.MONGODB_URI &&
  !process.env.MONGODB_URI.includes('<username>')
    ? process.env.MONGODB_URI
    : 'mongodb://127.0.0.1:27017/jeya-hotel';

console.log('🔗 Connecting to MongoDB:', MONGO_URI);

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected successfully');
    console.log('📦 Database: jeya-hotel (local MongoDB Compass)');
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
      console.log(`🔐 Admin panel: http://localhost:3000/admin`);
    });
  })
  .catch(err => {
  console.error('❌ MongoDB connection error:');
  console.error(err);
  process.exit(1);
});

module.exports = app;
