require('dotenv').config();
const { connectToDatabase, closeDatabaseConnection } = require('../config/database');

const coffeeOptions = [
  { image: "https://athome.starbucks.com/sites/default/files/styles/recipe_banner_xlarge/public/2024-05/CaffeLatte_RecipeHeader_848x539_%402x.jpg.webp?itok=YSe_HTiQ", name: "Latte", price: "3" },
  { image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQDkwMZLgOZ1M9VbzhhjdXooCdiIEEr_L6ivND5s5Omq0YzawbBA0ajjiJQcmKdyAA3iI&usqp=CAU", name: "Long Black", price: "3" },
  { image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShL5OnIkVKLC8OjMhNGA71lcsqn4sQXI9q01tg7UGDbtSbHXFDb-0Hq8GiQyQSrJUzO1o&usqp=CAU", name: "Cappuccino", price: "3" },
  { image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJ97Atbggvff461mN470aPZG4psebAHRp6bg&s", name: "Kopi Gula Aren (Brown Sugar Coffee)", price: "3" },
  { image: "https://littlebitrecipes.com/wp-content/uploads/2023/07/iced-americano-sq.jpg", name: "Americano", price: "3" },
];

async function populateDb() {
  let db;
  try {
    db = await connectToDatabase();
    console.log('Connected to MongoDB');

    const coffeeItemsCollection = db.collection('coffeeItems');

    // Clear existing items
    await coffeeItemsCollection.deleteMany({});

    // Insert new items
    const result = await coffeeItemsCollection.insertMany(coffeeOptions);
    console.log(`${result.insertedCount} coffee items inserted`);
  } catch (error) {
    console.error('Error populating database:', error);
  } finally {
    if (db) {
      await closeDatabaseConnection();
      console.log('Database connection closed');
    }
  }
}

populateDb();