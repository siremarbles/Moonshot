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

  console.log('REQ = ', req);
  User.findOne({ _id: req.params.id }, function(err, user) {

    if (err) return next(err);
    
    if (user) {
      user.save(function(err) {
        if (err) { return next(err); }

        res.json({
          firstName: firstName,
          lastName: lastName,
          dob: dob,
          verification: 2
        })
      });
    }

  })
}
