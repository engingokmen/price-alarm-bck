const mongoose = require("mongoose");

export async function startDB() {
  const mongoUri = process.env?.MONGO_URI
    ? process.env.MONGO_URI
    : "mongodb://localhost:27017/";
  await mongoose.connect(`${mongoUri}alarm`);
}
