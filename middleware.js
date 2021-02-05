/**
 * This middleware is being used to verify the token,
 * retrive user based on the given token payload as well as signup and login validation
 *
 * @method - checkLogin checks the if the token matches. will throw error if invalid!
 * @method - userValidation checks for the user input fields for validations during registration
 * @method - loginValidation checks the validation of input during user login
 *
 */
const jwt = require("jsonwebtoken");
const { check } = require("express-validator");

module.exports = middleware = {
  checkLogin: (req, res, next) => {
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
  },

  userValidation: () => {
    return [
      // check input fields for the invalid entries.
      check("username", "Enter Valid Username!").not().isEmpty(),
      check("email", "Enter Valid Email!").isEmail(),
      check("password", "Enter Valid Password").isLength({ min: 8 }),
    ];
  },

  loginValidation: () => {
    return [
      check("email", "Enter Valid Email!").isEmail(),
      check("password", "Enter Valid Password").isLength({
        min: 8,
      }),
    ];
  },
};
