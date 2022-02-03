// Mongodb connection
const mongoose = require("mongoose");

const connectDB = (url) => {
  mongoose.connect(url);
  console.log("MongoDB connected");
};

module.exports = connectDB;
