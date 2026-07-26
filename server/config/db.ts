import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/instant-trust-funds";

console.log("MONGODB_URI =", MONGODB_URI);

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(MONGODB_URI);
    console.log(`[DATABASE] MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("[DATABASE] Error connecting to MongoDB:", error);
    process.exit(1);
  }
};