var Activity = require('../models/Activity');
var Group = require('../models/group');

exports.postActivity = function(req, res, next) {
  const activity = new Activity({
 // groupname: req.user.profile.group,
  activity_id: req.params.id,
  activity_type: req.body.activity_type,
  //paypal_batch_id: ,
   userid: req.body.userId,
   username: req.user.firstName,
    //userpic: req.user.profile.picture,
    //comment: req.body.comment,
  //date: Date.now

 });

activity.save(function(err) {
 if (err) { return next(err, activity); }
 res.send(activity + 'sucess')
 })
}

exports.getcreatedGroups  = function(req, res, next) {
    Group.find({ createdBy: req.body.followid}, function(err, activity) {
      if (err) return next(err);
      if (activity) {
        res.send(activity);

      } else {
        res.redirect('/');
      }
    })
}

exports.getActivity  = function(req, res, next) {
    Group.find({ userid: req.params.followid }, function(err, activity) {
      if (err) return next(err);
      if (activity) {
        res.send(activity);

      } else {
        res.redirect('/');
      }
    })
}
