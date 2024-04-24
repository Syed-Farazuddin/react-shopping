const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
const userModel = require("../models/User");

const userRegister = async (req, res) => {
  try {
    const { name, email, password, secret } = req.body;
    if (!name) {
      return res
        .status(400)
        .json({ success: false, message: "name is required" });
    }
    if (!email) {
      return res
        .status(400)
        .json({ success: false, message: "Email is required" });
    }
    if (!password) {
      return res
        .status(400)
        .json({ success: false, message: "Password is required" });
    }
    if (!secret) {
      return res
        .status(400)
        .json({ success: false, message: "Secret is required" });
    }
    const findUser = await userModel.findOne({ email });
    if (findUser) {
      return res
        .status(201)
        .json({ success: false, message: "User already exist try to login" });
    }
    const hashPass = await bcrypt.hash(password, 10);
    const user = await userModel.create({
      name,
      email,
      password: hashPass,
      secret,
    });
    res.send({ success: true, message: { name, email, secret } });
  } catch (e) {
    console.log(e);
    res.send(e.message);
  }
};

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email) {
      return res
        .status(400)
        .json({ success: false, message: "Email is required" });
    }
    if (!password) {
      return res
        .status(400)
        .json({ success: false, message: "Password is required" });
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status().json({
        success: false,
        message: "User doesn't exist! Register to continue",
      });
    }
    const userPass = user.password;
    const check = await bcrypt.compare(password, userPass);
    if (!check) {
      return res.status(401).json({
        success: false,
        message: "Incorrect password or email",
      });
    }
    const token = await jsonwebtoken.sign(
      { email: user.email },
      "JSON_SECRET_KEY"
    );
    return res.status(200).json({
      success: true,
      message: "User registration done successfully",
      user: {
        _id: user._id,
        email: user.email,
        name: user.name,
        mobile: user.mobile,
        token,
      },
    });
  } catch (e) {
    console.log(e);
  }
};

const checkUser = async (req, res) => {
  const { email } = req.body;
  const user = await userModel.findOne({ email });
  if (!user) {
    return res.json({ success: false, message: "User doesn't exist" });
  }
  return res.json({ success: true, message: "User exist" });
};

const forgotPass = async (req, res) => {
  const { email, secret, newpass } = req.body;
  if (!email) {
    return res.json({ success: false, message: "Email is required" });
  }
  if (!secret) {
    return res.json({ success: false, message: "Secret is required" });
  }
  if (!newpass) {
    return res.json({ success: false, message: "New password is required" });
  }
  let user = await userModel.findOne({ email });
  if (!user) {
    return res.json({
      success: false,
      message: "Invalid email id or User doesn't exist",
    });
  }
  const savedSecret = user.secret;
  if (savedSecret !== secret) {
    return res.json({
      success: false,
      message: "Secret key is invalid",
    });
  }
  const hashPass = await bcrypt.hash(newpass, 10);
  user.password = hashPass;
  await user.save();
  res.json({
    success: true,
    message: "Password updated successfully",
    user,
  });
};

const updatePassword = async (req, res) => {
  const { email, password, newPass } = req.body;
  if (!email) {
    return res.json({ success: false, message: "Email is required" });
  }
  if (!password) {
    return res.json({ success: false, message: "Password is required" });
  }
  if (!newPass) {
    return res.json({ success: false, message: "New password is required" });
  }
  let user = await userModel.findOne({ email: req.user.email });
  if (!user) {
    return res.json({
      success: false,
      message: "Invalid email id or User doesn't exist",
    });
  }
  const check = await bcrypt.compare(password, user.password);
  if (!check) {
    return res.json({ success: false, message: "Incorrect password" });
  }
  const hashPass = await bcrypt.hash(newPass, 10);
  user.password = hashPass;
  await user.save();
  res.json({
    success: true,
    message: "Password updated successfully",
    user,
  });
};

const updateProfile = async (req, res) => {
  let user = await userModel.findOne({ email: req.user.email });
  if (!user) {
    return res.json({ success: false, message: "User not found" });
  }
  const { name, email, secret, mobile, password } = req.body;
  if (!password) {
    return res.json({
      success: false,
      message: "Password is required to update your details",
    });
  }
  const check = await bcrypt.compare(password, user.password);
  if (!check) {
    return res.json({ success: false, message: "Invalid Password" });
  }
  user.name = name || user.name;
  user.email = email || user.email;
  user.secret = secret || user.secret;
  user.mobile = mobile || user.mobile;
  await user.save();
  return res.json({
    success: true,
    message: "User details updated successfully",
  });
};

module.exports = {
  updateProfile,
  userLogin,
  userRegister,
  checkUser,
  forgotPass,
  updatePassword,
};
