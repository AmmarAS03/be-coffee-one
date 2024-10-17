require('dotenv').config();
const { connectToDatabase, closeDatabaseConnection } = require('../config/database');
const bcrypt = require('bcrypt');

const users = [
  {
    name: 'Ammar',
    email: 'Ammar@gmail.com',
    password: 'ammar',
    roomNumber: '1103',
    building: 'Elizabeth',
    role: 'admin'
  },
  {
    name: 'Arhan',
    email: 'Arhan@gmail.com',
    password: 'arhan',
    roomNumber: '0703',
    building: 'Elizabeth',
    role: 'client'
  }
];

async function hashPassword(password) {
  const saltRounds = 10;
  return bcrypt.hash(password, saltRounds);
}

async function populateUsers() {
  let db;
  try {
    db = await connectToDatabase();
    console.log('Connected to MongoDB');

    const usersCollection = db.collection('users');

    // Clear existing users
    await usersCollection.deleteMany({});

    // Hash passwords and insert new users
    const usersWithHashedPasswords = await Promise.all(users.map(async (user) => ({
      ...user,
      password: await hashPassword(user.password)
    })));

    const result = await usersCollection.insertMany(usersWithHashedPasswords);
    console.log(`${result.insertedCount} users inserted`);
  } catch (error) {
    console.error('Error populating users:', error);
  } finally {
    if (db) {
      await closeDatabaseConnection();
      console.log('Database connection closed');
    }
  }
}

populateUsers();