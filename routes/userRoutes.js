const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const db = req.app.locals.db;
    const usersCollection = db.collection('users');
    const users = await usersCollection.find({}, { projection: { password: 0 } }).toArray();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/user/orders', async (req, res) => {
    try {
      const { email } = req.query;
  
      if (!email) {
        return res.status(400).json({ message: 'Email parameter is required' });
      }
  
      const db = req.app.locals.db;
      const ordersCollection = db.collection('orders');
  
      const userOrders = await ordersCollection.find({
        email: email
      }).sort({ order_date: -1, selected_time: 1 }).toArray();
  
      const orderHistory = userOrders.map(order => ({
        orderId: order._id,
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
  
      res.json(orderHistory);
    } catch (error) {
      console.error('Error fetching user orders:', error);
      res.status(500).json({ message: 'Error fetching user orders', error: error.message });
    }
  });

module.exports = router;