const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const followUserRequestSchema = new Schema({
  followerName: String,
  followingName: String,
  followerId: String,
  followingId: String,
  answered: { type: Boolean, default: false }
});

const FollowUserRequestClass = mongoose.model('follow_user_request', followUserRequestSchema);

module.exports = FollowUserRequestClass;
