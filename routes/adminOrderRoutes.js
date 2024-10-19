const express = require('express');
const router = express.Router();

router.get('/summary', async (req, res) => {
  try {
    const { date } = req.query;
    const startDate = new Date(date);
    startDate.setHours(0, 0, 0, 0);
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + 1);

    const db = req.app.locals.db;
    const ordersCollection = db.collection('orders');

    const orders = await ordersCollection.find({
      order_date: {
        $gte: startDate,
        $lt: endDate
      }
    }).sort({ selected_time: 1 }).toArray();

    const summary = orders.map(order => ({
      coffee_name: order.coffee_name,
      quantity: order.quantity,
      name: order.name,
      email: order.email,
      delivery_option: order.delivery_option,
      building: order.building,
      room_location: order.room_location,
      selected_time: order.selected_time,
      order_date: order.order_date,
      created_at: order.created_at,
      notes: order.notes
    }));

    res.json(summary);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/add', async (req, res) => {
  try {
    const { 
      coffee_name, 
      quantity, 
      name,
      email,
      delivery_option,
      building,
      room_location, 
      selected_time,
      order_date,
      notes
    } = req.body;

    if (!coffee_name || !quantity || !name || !email || !delivery_option || !selected_time || !order_date) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const db = req.app.locals.db;
    const ordersCollection = db.collection('orders');

    const newOrder = {
      coffee_name,
      quantity,
      name,
      email,
      delivery_option,
      building,
      room_location,
      selected_time,
      notes,
      order_date: new Date(order_date),
      created_at: new Date()
    };

    const result = await ordersCollection.insertOne(newOrder);

    res.status(201).json({ 
      message: 'Order added successfully', 
      orderId: result.insertedId 
    });
  } catch (error) {
    console.error('Error adding order:', error);
    res.status(500).json({ message: 'Error adding order', error: error.message });
  }
});

module.exports = router;