// /lib/mongo.ts
import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://vivektarnallya_db_user:yyQVrzRjWlM8UXL0@cluster0.l1q4wvi.mongodb.net/";

if (!MONGO_URI) {
  throw new Error("Please define the MONGO_URI environment variable");
}

// Use a global variable to cache the connection (Next.js hot reload safe)
let cached = globalThis.mongoose;

if (!cached) {
  cached = globalThis.mongoose = { conn: null, promise: null };
}

async function connect() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGO_URI).then((mongoose) => mongoose);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default connect;
