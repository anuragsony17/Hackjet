const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/Hackjet");
    console.log("✅ MongoDB connected...");
  } catch (err) {
    console.error("❌ Error connecting DB:", err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
