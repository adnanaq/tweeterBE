const express = require("express");
const app = express();
const router = express.Router();

router.get("/", (req, res, next) => {
  res.json({ message: "This is login route!" });
});

module.exports = router;
