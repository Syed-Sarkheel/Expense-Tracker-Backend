import mongoose from "mongoose";
import "dotenv/config";

const connectDB = async () => {
  const MONGO_URL = process.env.MONGO_URL;

  try {
    await mongoose.connect(MONGO_URL);

    console.log("Connected to DB successfully");
  } catch (error) {
    console.log(error);

    process.exit(1);
  }
};

export { connectDB };
