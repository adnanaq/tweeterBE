const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// Initialization of User schema
const userSchema = new Schema(
  {
    username: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, unique: true },
    password: { type: String, required: true },
    likes: [{ type: Schema.Types.ObjectId, ref: "Post" }],
    retweets: [{ type: Schema.Types.ObjectId, ref: "Post" }],
    following: [{ type: Schema.Types.ObjectId, ref: "User" }],
    followers: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
