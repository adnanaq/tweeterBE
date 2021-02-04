const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");

const app = express();
const router = express.Router();

app.use(bodyParser.urlencoded({ extended: false }));

router.get("/", (req, res, next) => {
  res.status(200).json({ message: "This is register route!" });
});

router.post("/", (req, res, next) => {
  res.status(200).json({ message: "This is register route!" });
});

module.exports = router;
