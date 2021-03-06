const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { validationResult, cookie } = require("express-validator");
const middleware = require("../middleware");

const router = express.Router();

const User = require("../schema/userSchema");

/**
 * @method - POST
 * @param - /signup
 * @description - User signup and validation
 */

router.post("/", middleware.userValidation(), async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ err: errors.array() });
  }

  const { username, email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: "User Already Exist",
      });
    }

    // Create new user
    user = new User({
      username,
      email,
      password,
    });

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    // Save new user to database
    await user.save();

    const payload = { user: { id: user.id } };

    jwt.sign(
      payload,
      "randomString",
      { expiresIn: 10000 },
      (err, signedToken) => {
        if (err) throw err;
        res.status(200).json({ signedToken, message: "User Created!" });
      }
    );
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Could not save the User!");
  }
});

module.exports = router;
