const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { connectToDatabase } = require('./config/database');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require('./routes/authRoutes');
const orderRoutes = require('./routes/orderRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/orders', orderRoutes);

// Update the basic route for testing
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to the Coffee Order API!' });
  });

const PORT = process.env.PORT || 5432;

async function startServer() {
  try {
    const db = await connectToDatabase();
    app.locals.db = db; // This makes the db instance available in your route handlers

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to connect to the database', error);
    process.exit(1);
  }
}

startServer();

module.exports = app;