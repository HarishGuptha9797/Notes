const asyncHandler = require("express-async-handler");
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const createUser = asyncHandler(async (req, res) => {
  const { fullName, email, password } = req.body;
  if (!fullName) {
    return res
      .status(400)
      .json({ error: true, message: "Full Name is required!" });
    //throw new Error("Full Name is required");
  }
  if (!email) {
    res.status(400);
    throw new Error("Email is required");
  }
  if (!password) {
    res.status(400);
    throw new Error("Password is required");
  }

  const isUser = await User.findOne({ email: email });
  if (isUser) {
    res.status(400);
    throw new Error("User already exixts");
  }

  const user = await User.create({
    fullName,
    email,
    password,
  });

  const accessToken = jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "3000m",
  });
  res.json({
    error: false,
    user,
    accessToken,
    message: "Registration Successfull",
  });
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email) {
    return res.status(400).json({ error: true, message: "Email is required!" });
    //throw new Error("Email is required!");
  }
  if (!password) {
    return res
      .status(400)
      .json({ error: true, message: "Password is required" });
    //throw new Error("Password is required!");
  }
  const userInfo = await User.findOne({ email: email });
  if (!userInfo) {
    return res.status(400).json({ error: true, message: "User not found" });
    //throw new Error("User not found");
  }
  if (userInfo.email === email && userInfo.password === password) {
    const user = { user: userInfo };
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "3000m",
    });
    return res.status(200).json({
      error: false,
      message: "Login Successful",
      email,
      accessToken,
    });
  } else {
    res.status(400);
    throw new Error("Invalid Credentials");
  }
});

const getUser = asyncHandler(async (req, res) => {
  const { user } = req.user;
  const isUser = await User.findOne({ _id: user._id });

  if (!isUser) {
    return res.status(401).json({ error: true, message: "User not found" });
  }
  return res.json({
    user: {
      fullName: isUser.fullName,
      email: isUser.email,
      _id: isUser._id,
      createdAt: isUser.createdAt,
    },
    message: "",
  });
});
module.exports = { createUser, loginUser, getUser };
