import { connect } from "mongoose";
import { config } from "@/config/environment";

export const connectDataBase = async () => {
  try {
    if (!config.database.mongodbUri) {
      throw new Error("MongoDB URI environment variable is not set");
    }

    console.log("🔌 Attempting to connect to MongoDB...");
    await connect(config.database.mongodbUri);
    console.log("✅ Connected to MongoDB successfully");
  } catch (error) {
    console.error("❌ Failed to connect to MongoDB:", error);
    throw error;
  }
};
