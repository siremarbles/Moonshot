var User = require('../models/user');

exports.getUserData = function(req, res, next) {
    User.findOne({ _id: req.params.id }, function(err, user) {
      if (err) return next(err);
      if (user) {
        res.send(user);
      } else {
        res.redirect('/');
      }
    })
}

exports.updateV1Details = function(req, res, next) {
  User.findByIdAndUpdate(req.params.id, {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      dob: req.body.dob,
      userType: req.body.userType,
      verification: 2,
    }, { new: true }, function(err, user) {
    if (err) throw err;
    if (user) {
      res.send(user);
    }
  })
}

exports.updateCreditCard = function(req, res, next) {
  const ccN = req.body.ccN;
  User.findByIdAndUpdate(req.params.id, {
    ccNumber: ccN,
    ccExpiration: req.body.ccE,
    ccCVV: req.body.ccV,
    ccName: req.body.ccName,
    verification: 3
  }, { new: true }, function(err, user) {
    if (err) throw err;
    if (user) {
      res.send(user);
    }
  })
}

exports.fetchAllUsers = function(req, res, next) {
  User.find({}, {email: 1, firstName: 1}, function(err, users) {
    if (err) { return next(err); }
    if (users) {
      res.send(users);
    }
  })
}

exports.getProfileData = function(req, res, next) {
  User.findOne({ _id: req.headers.profileid }, {
    email: 1,
    firstName: 1,
    lastName: 1,
    groups: 1,
    dob: 1,
    friends: 1,
    profilePublic: 1,
    userFollowRequest: 1,
    usersThatFollow: 1
  }, function(err, user) {
    if (err) { return next(err); }
    if (user) {
      res.send(user);
    }
  })
}

exports.changeProfilePrivacy = function(req, res, next) {
    User.findOne({ _id: req.body.profileId }, function(err, user) {
      if (err) { return next(err); }
      if (req.body.privacy === "true") {
        console.log('user privacy should now be set to private');
      } else if (req.body.privacy === "false") {
        console.log('user privacy should now be set to public');
      }
    })
}
