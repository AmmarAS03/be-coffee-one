const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();

const uri = process.env.MONGODB_URI;

if (!uri) {
  console.error("MONGODB_URI is not defined in the environment variables");
  process.exit(1);
}

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function connectToDatabase() {
  try {
    // Connect the client to the server
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
    return client.db("coffee_orders"); // Replace with your actual database name
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    await client.close();
    process.exit(1);
  }
}

async function closeDatabaseConnection() {
  await client.close();
  console.log("Closed MongoDB connection");
}

module.exports = { connectToDatabase, closeDatabaseConnection, client };