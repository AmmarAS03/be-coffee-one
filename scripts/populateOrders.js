require('dotenv').config();
const { connectToDatabase, closeDatabaseConnection } = require('../config/database');

const sampleOrders = [
  {
    coffee_name: "Latte",
    quantity: 2,
    name: "John Doe",
    delivery_option: "Pickup",
    room_location: null,
    selected_time: "7am",
    order_date: new Date('2024-10-19')
  },
  {
    coffee_name: "Cappuccino",
    quantity: 1,
    name: "Jane Smith",
    delivery_option: "Delivery",
    room_location: "Elizabeth Building Room 1103",
    selected_time: "10am",
    order_date: new Date('2024-10-19')
  },
];

async function populateOrders() {
  let db;
  try {
    db = await connectToDatabase();
    console.log('Connected to MongoDB');

    const ordersCollection = db.collection('orders');

    // Clear existing orders
    await ordersCollection.deleteMany({});

    // Insert new orders
    const result = await ordersCollection.insertMany(sampleOrders);
    console.log(`${result.insertedCount} orders inserted`);
  } catch (error) {
    console.error('Error populating database:', error);
  } finally {
    if (db) {
      await closeDatabaseConnection();
      console.log('Database connection closed');
    }
  }
}

populateOrders();