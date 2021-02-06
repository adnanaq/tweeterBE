const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { validationResult } = require("express-validator");
const middleware = require("../middleware");

const router = express.Router();

// IMPORT user smodel
const User = require("../schema/userSchema");

/**
 * @method - POST
 * @param - /login
 * @description - User login and validation of inout field.
 */

router.post("/", middleware.loginValidation(), async (req, res) => {
  const errors = validationResult(req);

  // Check for any errors
  if (!errors.isEmpty()) {
    return res.status(400).json({
      err: errors.array(),
    });
  }

  const { email, password } = req.body;
  try {
    // Query the database for the provided email
    let user = await User.findOne({ email });

    // ERROR if not exist
    if (!user) {
      return res.status(400).json({
        message: "User Does Not Exist!",
      });
    }

    // PASSWORD match
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(400).json({
        message: "Incorrect Password! Enter the correct Password!",
      });
    }

    const payload = {
      user: { id: user.id },
    };

    jwt.sign(
      payload,
      "randomString",
      { expiresIn: 3600 },
      (err, signedToken) => {
        if (err) throw err;
        res.status(200).json({
          signedToken,
          message: "Authorization Valid!",
        });
      }
    );
  } catch (e) {
    console.error(e);
    res.status(500).json({
      message: "Server Error",
    });
  }
});

module.exports = router;
