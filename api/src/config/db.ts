import mongoose from "mongoose";



export const connectDB = async () => {
  process.loadEnvFile();
  const MONGO_URI = process.env.MONGO_URI || "";
  try {
    await mongoose.connect(MONGO_URI);
    console.log("🔥 MongoDB connected");
  } catch (error) {
    console.error("❌ Error connecting to MongoDB:", error);
    process.exit(1);
  }
};
