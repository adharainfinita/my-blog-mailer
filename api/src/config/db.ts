import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

export const connectDB = async () => {
  const MONGO_URI = process.env.MONGO_URI || "";
  
  if (!MONGO_URI) {
    console.error("❌ No MongoDB URI provided!");
    process.exit(1);
  }

  try {
    await mongoose.connect(MONGO_URI);
    console.log("🔥 MongoDB connected");
  } catch (error) {
    console.error("❌ Error connecting to MongoDB:", error);
    process.exit(1);
  }
};