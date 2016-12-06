const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

var Group = require('./group');

const userSchema = new Schema({
  email: { type: String, unique: true, lowercase: true },
  password: String,
  proDescription: String,
  userId: { type: Number, deault: 0 },
  userType: String,
  ccNumber: String,
  ccExpiration: String,
  ccCVV: String,
  ccName: String,
  firstName: String,
  lastName: String,
  verification: Number,
  groups: [{ groupName: String, groupId: String }],
  followingUsers: [{ followingName: String, followingId: String }],
  followingGroups: {},
  usersThatFollow: [{ followerName: String, followerId: String }],
  parentApproval: Boolean,
  gender: String,
  dob: String,
  dateJoined: Date,
  phoneNumber: String,
  public: Boolean,
  userFollowRequest: [{ requestId: String, followerName: String, followerId: String }],
  profilePublic: { type: Boolean, default: true }
});

userSchema.pre('save', function(next) {
  const user = this;

  bcrypt.genSalt(10, function(err, salt) {
    if (err) { return next(err); }

    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if (err) { return next(err); }

      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = function(candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) { return callback(err); }
    callback(null, isMatch);
  });
}

const ModelClass = mongoose.model('user', userSchema);

module.exports = ModelClass;
