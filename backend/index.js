const express = require("express");
const cors = require("cors");
const connectDB = require("./db/db.js");
const {
  userLogin,
  userRegister,
  checkUser,
  forgotPass,
  updatePassword,
  updateProfile,
} = require("./controllers/UserAuth.js");
const userAuth = require("./middlewares/authMiddleware.js");

// const { userAuth } = require("./middleware/AuthMiddleware");

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

const PORT = 4000;

app.get("/", (req, res) => {
  res.send("Welcome to homepage");
});

app.post("/login", userLogin);

app.post("/register", userRegister);

app.get("/check", checkUser);

app.put("/updatePassword", userAuth, updatePassword);

app.put("/forgotPassword", forgotPass);

app.put("/updateProfile", userAuth, updateProfile);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
