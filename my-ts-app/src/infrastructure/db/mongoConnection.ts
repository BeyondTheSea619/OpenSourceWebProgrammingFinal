import mongoose from "mongoose";
import * as dotenv from "dotenv";

dotenv.config({ path: require("path").resolve(__dirname, "../../../.env") });

const MONGO_URI = process.env.MONGO_URI as string;

export async function connectToDatabase(): Promise<void> {
  try {
    console.log("Connecting to:", MONGO_URI); // temporary debug line
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
}
