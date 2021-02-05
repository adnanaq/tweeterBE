const express = require("express");
// const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validationResult, check } = require("express-validator/check");

const app = express();
const router = express.Router();

const User = require("../schema/user");

// app.use(bodyParser.urlencoded({ extended: false }));

/**
 * @method - POST
 * @param - /signup
 * @description - User signup and validation
 */

router.post(
  "/",
  [
    check("username", "Enter Valid Username!").not().isEmpty(),
    check("email", "Enter Valid Email!").isEmail(),
    check("password", "Enter Valid Password").isLength({ min: 8 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    console.log(req.body);

    if (!errors.isEmpty()) {
      return res.status(400).json({ err: errors.array(), msg: "confirmed" });
    }

    const { username, email, password } = req.body;

    try {
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({
          message: "User Already Exist",
        });
      }

      user = new User({
        username,
        email,
        password,
      });

      console.log(this.user);
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const payload = { user: { id: user.id } };

      jwt.sign(payload, "randomString", { expiresIn: 10000 }, (err, token) => {
        if (err) throw err;
        res.status(200).json({ token });
      });
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Could not save the User!");
    }
  }
);

module.exports = router;
