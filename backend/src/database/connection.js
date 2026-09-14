import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("✅ MongoDB connected successfully.");
    console.log("📦 Database:", mongoose.connection.name);
    console.log("🖥️ Mongo Host:", mongoose.connection.host);
  } catch (error) {
    console.error("❌ Failed to connect to MongoDB.");
    console.error(error.message);

    process.exit(1);
  }
};

export default connectDB;