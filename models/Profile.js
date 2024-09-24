const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  profileUrl: {
    type: String,
    required: true,
  },
  about: {
    type: String,
  },
  bio: {
    type: String,
  },
  location: {
    type: String,
  },
  followerCount: {
    type: Number,
  },
  connectionCount: {
    type: Number,
  },
});

module.exports = mongoose.model("profileModel", profileSchema);
