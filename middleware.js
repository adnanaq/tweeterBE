/**
 * This middleware is being used to verify the token,
 * retrive user based on the given token payload
 */
const jwt = require("jsonwebtoken");

exports.checkLogin = (req, res, next) => {
  const token = req.header("token");
  if (!token) {
    return res.status(401).json({ message: "Error Authentication" });
  }

  try {
    const decode = jwt.verify(token, "randomString");
    req.user = decode.user;
    next();
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Token Invalid!" });
    return res.redirect("/login");
  }
};
