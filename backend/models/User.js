const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  secret: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
  },
});

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
