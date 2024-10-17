const { connectToDatabase, closeDatabaseConnection } = require('./config/database');

async function testConnection() {
  try {
    const db = await connectToDatabase();
    console.log("Successfully connected to the database!");
    
    // Optional: You can try a simple database operation here
    const collections = await db.listCollections().toArray();
    console.log("Collections in the database:", collections.map(c => c.name));

    await closeDatabaseConnection();
    console.log("Connection closed successfully.");
  } catch (error) {
    console.error("Failed to connect to the database:", error);
  }
}

testConnection();