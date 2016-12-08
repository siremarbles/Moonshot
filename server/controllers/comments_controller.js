var Comment = require('../models/CommentModel');



exports.postComment = function(req, res, next) {
  var comment = new Comment({
 // groupname: req.user.profile.group,
  activity_id: req.params.id,
  activity_type: req.params.activity_type,
  //paypal_batch_id: ,
   userid: req.user.id,
   username: req.user.profile.name,
    userpic: req.user.profile.picture,
    comment: req.body.comment,
  //date: Date.now

 });

 console.log(comment);
     comment.save(function(err) {
        if (err) return next(err);
     //   req.flash('success',{msg: 'Your funds are coming soon'});
          res.send(comment);
      });
}
