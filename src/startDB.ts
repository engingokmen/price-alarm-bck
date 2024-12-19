const mongoose = require("mongoose");

export async function startDB() {
  console.log("Connecting to database");
  const mongoUri = process.env?.MONGO_URI
    ? process.env.MONGO_URI
    : "mongodb://localhost:27017/";
  const connection = await mongoose.connect(`${mongoUri}alarm`);
  console.log("Connected to:", connection.connections[0].name);
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
