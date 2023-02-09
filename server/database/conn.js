import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

// Mongoose Config
mongoose.set("strictQuery", false);

async function connect() {
  const mongod = await MongoMemoryServer.create();
  const getUri = mongod.getUri();

  const db = await mongoose.connect(getUri);
  console.log("Database connected");

  return db;
}

export default connect;
