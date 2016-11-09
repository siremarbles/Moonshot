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
  User.findByIdAndUpdate(req.params.id, {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      dob: req.body.dob,
      userType: req.body.userType,
      verification: 2,
    }, {new: true}, function(err, user) {
    if (err) throw err;
    // console.log("the update user is now = ", user);
  })
}

exports.updateCreditCard = function(req, res, next) {
  User.findByIdAndUpdate(req.params.id, {
    ccNumber: req.body.ccN,
    ccExpiration: req.body.ccE,
    ccCVV: req.body.ccV,
    ccName: req.body.ccName,
    verification: 3
  }, {new: true}, function(err, user) {
    if (err) throw err;
    console.log("~~~~~~~THE UPDATED USER IS NOT ======= ", user);
  })
}


/*

DO WE NEED TO TELL/WARN/PROHIBIT
USERS FROM ADDING THE SAME CREDIT CARD
ON MULTIPLE ACCOUNTS?

*/
