const express = require("express");
const bodyParser = require("body-parser");

const User = require("../../schema/userSchema");
// const Post = require('../../schemas/PostSchema');
const Chat = require("../../schema/chatSchema");
// const Message = require("../../schemas/MessageSchema");

const app = express();
const router = express.Router();

app.use(bodyParser.urlencoded({ extended: false }));

router.post("/", async (req, res, next) => {
  if (!req.body.users) {
    console.log("Users param not sent with request");
    return res.sendStatus(400);
  }

  const users = JSON.parse(JSON.stringify(req.body.users));

  if (users.length == 0) {
    console.log("Users array is empty");
    return res.sendStatus(400);
  }

  users.push(req.user.id);

  const chatData = {
    users: users,
    isGroupChat: true,
  };

  Chat.create(chatData)
    .then((results) => res.status(200).send(results))
    .catch((error) => {
      console.log(error);
      res.sendStatus(400);
    });
});

router.get("/", async (req, res, next) => {
  Chat.find({ users: { $elemMatch: { $eq: req.user.id } } })
    .then((results) => res.status(200).send(results))
    .catch((error) => {
      console.log(error);
      res.sendStatus(400);
    });
});
module.exports = router;
