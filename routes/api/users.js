const express = require("express");
const bodyParser = require("body-parser");
const User = require("../../schema/userSchema");
const middleware = require("../../middleware");

const app = express();
const router = express.Router();
app.use(bodyParser.urlencoded({ extended: false }));

// QUERY username route
router.get("/", async (req, res, next) => {
  const searchObj = req.query;
  if (req.query.search !== undefined) {
    searchObj = { username: { $regex: req.query.search, $options: "i" } };
  }

  // SEARCH the database for the query
  User.find(searchObj)
    .then((results) => res.status(200).send(results))
    .catch((error) => {
      console.log(error);
      res.sendStatus(400);
    });
});

// FETCH the 'Following' list for the user
router.get("/:userId/following", async (req, res, next) => {
  // QUERY database for the user
  User.findById(req.params.userId)
    .populate("following")
    .then((results) => {
      console.log(results);
      res.status(200).send(results);
    })
    .catch((error) => {
      console.log(error);
      res.sendStatus(400);
    });
});

// FETCH the 'Following' list for the user
router.get("/:userId/followers", async (req, res, next) => {
  User.findById(req.params.userId)
    .populate("followers")
    .then((results) => {
      res.status(200).send(results);
    })
    .catch((error) => {
      console.log(error);
      res.sendStatus(400);
    });
});

// UPDATE the 'follow' list for the current loggedin user
router.put("/:userId/follow", middleware.checkLogin, async (req, res, next) => {
  const userId = req.params.userId;

  const user = await User.findById(userId);
  if (user == null) return res.sendStatus(404);

  // Check if current loggedin user is in the other user list
  const isFollowing = user.followers && user.followers.includes(req.user);
  const option = isFollowing ? "$pull" : "$addToSet";

  // UPDATE the following list of the current loggedin user
  req.user = await User.findByIdAndUpdate(
    req.user.id,
    { [option]: { following: userId } },
    { new: true }
  ).catch((error) => {
    console.log(error);
    res.sendStatus(400);
  });

  // UPDATE the follower list of the other user
  User.findByIdAndUpdate(userId, {
    [option]: { followers: req.user.id },
  }).catch((error) => {
    console.log(error);
    res.sendStatus(400);
  });
  res.status(200).send(req.user);
});

module.exports = router;
