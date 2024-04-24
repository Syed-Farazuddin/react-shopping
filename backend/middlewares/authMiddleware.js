const jwt = require("jsonwebtoken");

const userAuth = async (req, res, next) => {
  const authHeader = req.header("Authorization");
  console.log(authHeader);
  if (!authHeader) {
    return res
      .status(498)
      .json({ success: false, message: "Not authorized to access" });
  }
  const user = jwt.verify(authHeader, "JSON_SECRET_KEY");
  if (!user) {
    return res.status(498).json({ success: false, message: "Invalid token" });
  }
  req.user = user;
  next();
};

module.exports = userAuth;
