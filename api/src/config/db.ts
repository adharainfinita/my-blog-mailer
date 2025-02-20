import mongoose from "mongoose";



export const connectDB = async () => {
  process.loadEnvFile();

  try {
    await mongoose.connect(process.env.MONGO_URI || "");
    console.log("🔥 MongoDB connected");
  } catch (error) {
    console.error("❌ Error connecting to MongoDB:", error);
    process.exit(1);
  }
};
