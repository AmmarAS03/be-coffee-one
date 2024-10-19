const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { connectToDatabase } = require('./config/database');
const coffeeItemRoutes = require('./routes/coffeeItemRoutes');
const adminOrderRoutes = require('./routes/adminOrderRoutes');

const app = express();

// Middleware
app.use(cors({ origin: 'http://localhost:3000' })); 
app.use(express.json());

// Routes
const orderRoutes = require('./routes/orderRoutes');
const userRoutes = require('./routes/userRoutes'); 

app.use('/api/items', coffeeItemRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/users', userRoutes);
app.use('/api/admin/orders', adminOrderRoutes); 


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