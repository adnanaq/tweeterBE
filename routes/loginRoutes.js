const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validationResult, check } = require("express-validator/check");

const app = express();
const router = express.Router();

const User = require("../schema/user");

router.post(
  "/",
  [
    check("email", "Enter Valid Email!").isEmail(),
    check("password", "Enter Valid Password").isLength({
      min: 8,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        err: errors.array(),
      });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({
          message: "User Does Not Exist!",
        });
      }

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
        {
          expiresIn: 3600,
        },
        (err, token) => {
          if (err) throw err;
          res.status(200).json({
            token,
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
    // res.json({ message: "This is login route!" });
  }
);

module.exports = router;
