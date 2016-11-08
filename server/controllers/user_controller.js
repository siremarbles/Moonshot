var User = require('../models/user');

exports.getProfileData = function(req, res, next) {
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
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;

  User.findByIdAndUpdate(req.params.id, {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      dob: req.body.dob,
      verification: 2,
    }, {new: true}, function(err, user) {
    if (err) throw err;
    // console.log("the update user is now = ", user);
  })
}
