const { Schema, model } = require("mongoose");

const ProductSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name of product is required"],
    trim: true,
    minlength: [3, "Name of product must be at least 3 characters long"],
  },
  description: {
    type: String,
    required: [true, "Description of product is required"],
    trim: true,
    minlength: [3, "Description of product must be at least 3 characters long"],
  },
  price: {
    type: Number,
    required: [true, "Price of product is required"],
    trim: true,
    minlength: [3, "Price of product must be at least 3 characters long"],
  },
  stock: {
    type: Number,
    required: [true, "Stock of product is required"],
    trim: true,
  },
  category: {
    type: String,
    required: [true, "Category of product is required"],
    trim: true,
    minlength: [3, "Category of product must be at least 3 characters long"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = model("Product", ProductSchema);
