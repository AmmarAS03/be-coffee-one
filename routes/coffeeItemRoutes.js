const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const db = req.app.locals.db;
    const coffeeItemsCollection = db.collection('coffeeItems');
    const items = await coffeeItemsCollection.find({}).toArray();
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;