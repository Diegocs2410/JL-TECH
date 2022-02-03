const UserModel = require("../models/users.model");
const {
  StatusCodes: {
    OK,
    BAD_REQUEST,
    UNAUTHORIZED,
    INTERNAL_SERVER_ERROR,
    CREATED,
    NOT_FOUND,
  },
} = require("http-status-codes");
const asyncWrapper = require("../helpers/asyncWrapper");

const { messageGeneral } = require("../helpers/messages");
const delImg = require("../helpers/delImg");
const userController = {};

// Get all users
userController.getAllUsers = asyncWrapper(async (req, res) => {
  const users = await UserModel.find({}, { password: 0 });
  if (users.length === 0)
    return messageGeneral(res, NOT_FOUND, false, null, "No users found");
  return messageGeneral(res, OK, true, users, "Users retrieved successfully");
});

// Get user by id
userController.getUserById = asyncWrapper(async (req, res) => {
  const { id } = req.params;
  const user = await UserModel.findById(id).select("-password");
  if (user)
    return messageGeneral(res, OK, true, user, "User retrieved successfully");
  return messageGeneral(res, NOT_FOUND, false, null, "User not found");
});

// Create user
userController.createUser = asyncWrapper(async (req, res) => {
  const { name, email, password, contact, role } = req.body;
  // Get img from req.file if exists delete if not do nothing

  const user = new UserModel({
    name,
    email,
    password,
    contact,
    role,
  });
  if (req.file) {
    const { filename } = req.file;
    user.setAvatar(filename);
  } else {
    user.avatar = "https://joeschmoe.io/api/v1/" + user.name;
  }

  const newUser = await user.save();

  // Generate token 
  const token = await user.generateToken();
  if (newUser)
    return messageGeneral(
      res,
      CREATED,
      true,
      {
        user: newUser,
        token,
      },
      "User created successfully"
    );
  return messageGeneral(res, BAD_REQUEST, false, null, "User not created");
});

// Delete user
userController.deleteUser = asyncWrapper(async (req, res) => {
  const { id } = req.params;
  const user = await UserModel.findById(id);

  if (!user)
    return messageGeneral(res, NOT_FOUND, false, null, "User not found");

  user.nameImg && delImg(user.nameImg);
  await user.deleteOne();
  messageGeneral(res, OK, true, null, "User deleted successfully");
});

// Update user by id and his avatar
userController.updateUser = asyncWrapper(async (req, res) => {
  const { id } = req.params;
  const user = await UserModel.findById(id);
  if (!user)
    return messageGeneral(res, NOT_FOUND, false, null, "User not found");
  // Get info from req.body, if there is no info from req.body, take info from user in DB
  const { name, email, contact, role, password } = req.body;
  const newUser = {
    name: name || user.name,
    email: email || user.email,
    contact: contact || user.contact,
    role: role || user.role,
    password: password || user.password,
  };

  if (req.file) {
    if (user.nameImg) delImg(user.nameImg);
    const { filename } = req.file;
    user.setAvatar(filename);
    await user.save();
  }
  const updatedUser = await UserModel.findByIdAndUpdate(id, newUser, {
    new: true,
  });
  messageGeneral(res, OK, true, updatedUser, "User updated successfully");
});

// Login user by email and password and return token
userController.loginUser = asyncWrapper(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return messageGeneral(
      res,
      BAD_REQUEST,
      false,
      null,
      "Email or password is empty"
    );
  const user = await UserModel.findOne({ email });
  if (!user)
    return messageGeneral(res, UNAUTHORIZED, false, null, "User not found");

  const isMatch = await user.comparePassword(password);
  if (!isMatch)
    return messageGeneral(
      res,
      UNAUTHORIZED,
      false,
      null,
      "email/Password is incorrect"
    );

  const token = await user.generateToken();
  // return user and token
  return messageGeneral(res, OK, true, { user, token }, "User logged in");
});

module.exports = userController;
