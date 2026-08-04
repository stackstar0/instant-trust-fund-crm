import mongoose from "mongoose";

export const connectDB = async (): Promise<string> => {
  const primaryUri = process.env.MONGODB_URI;

  if (primaryUri && !primaryUri.includes("<password>")) {
    try {
      console.log(`[DATABASE] Attempting connection to MongoDB Atlas...`);
      const conn = await mongoose.connect(primaryUri, { serverSelectionTimeoutMS: 5000 });
      console.log(`[DATABASE] MongoDB Connected: ${conn.connection.host}`);
      return conn.connection.host;
    } catch (error: any) {
      console.warn(`[DATABASE] Could not connect to Atlas (${error.message}). Initializing fallback database...`);
    }
  }

  // Local fallback
  if (process.env.NODE_ENV === "production") {
    console.error("[DATABASE] FATAL ERROR: Cannot connect to MongoDB Atlas in production. Crashing...");
    process.exit(1);
  }

  try {
    const localUri = "mongodb://127.0.0.1:27017/ify_crm";
    const conn = await mongoose.connect(localUri, { serverSelectionTimeoutMS: 3000 });
    console.log(`[DATABASE] Connected to local MongoDB: ${conn.connection.host}`);
    return conn.connection.host;
  } catch (err) {
    // In-memory fallback
    try {
      const { MongoMemoryServer } = await import("mongodb-memory-server");
      const mongod = await MongoMemoryServer.create();
      const uri = mongod.getUri();
      const conn = await mongoose.connect(uri);
      console.log(`[DATABASE] Connected to In-Memory MongoDB Engine: ${conn.connection.host}`);
      return conn.connection.host;
    } catch (memErr: any) {
      console.error("[DATABASE] Fatal: Unable to initialize any MongoDB connection:", memErr);
      throw memErr;
    }
  }
};