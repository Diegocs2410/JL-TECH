const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");
const { messageGeneral } = require("../helpers/messages");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// USers shcema definition
const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
    minlength: [3, "Name must be at least 3 characters long"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    trim: true,
    unique: true,
    match: [
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
    ],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    trim: true,
  },
  avatar: {
    type: String,
    trim: true,
  },
  nameImg: {
    type: String,
    trim: true,
  },
  contact: {
    type: Number,
    required: [true, "Contact is required"],
    trim: true,
  },
  role: {
    type: String,
    required: [true, "Role is required"],
    trim: true,
    default: "admin",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

userSchema.pre("save", async function (next) {
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  } catch (err) {
    messageGeneral(res, 500, false, null, err.message);
  }
});
// Method to create JWT token
userSchema.methods.generateToken = function () {
  const token = jwt.sign({ id: this._id }, process.env.SECRET_KEY, {
    expiresIn: process.env.EXPIRES_IN,
  });
  return token;
};
// Methos to set user avatar
userSchema.methods.setAvatar = function setAvatar(fileName) {
  const url = process.env.URL;
  this.avatar = `${url}/public/${fileName}`;
  this.nameImg = fileName;
};

userSchema.methods.comparePassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (err) {
    messageGeneral(res, 500, false, null, err.message);
  }
};

module.exports = model("User", userSchema);
