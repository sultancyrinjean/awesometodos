const { MongoClient } = require("mongodb");
require("dotenv").config(); // Load .env variables

const uri = process.env.MONGODB_URI; // Get MongoDB URI from .env
let client;

const connectToDatabase = async () => {
  if (!client) {
    client = new MongoClient(uri);
    await client.connect();
    console.log("Connected to MongoDB");
  }
  return client;
};

const getConnectedClient = () => {
  if (!client) throw new Error("Database not connected yet!");
  return client;
};

module.exports = { connectToDatabase, getConnectedClient };