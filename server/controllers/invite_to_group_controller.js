InviteSchema = require('../models/invite_to_group');
User = require('../models/user');

exports.sendInvite = function(req, res, next) {
  console.log(req);
  InviteSchema.findOne({ groupId: req.body.groupId, invitedUserId: req.body.invitedId }, function(err, existingInvite) {
    if (err) { return next(err); }
    if (existingInvite) {
      //this user has already been invited to this group
      if (existingInvite.answered == false) {
        return res.status(422).send({ error: 'This user has already been invited to this group and has not accepted/denied it yet.'});
      }
    }
    const invite = new InviteSchema({
      invitingUserId: req.body.invitingId,
      invitingUserName: req.body.invitingName,
      invitedUserId: req.body.invitedId,
      invitedUserName: req.body.invitedName,
      groupId: req.body.groupId,
      groupName: req.body.groupName,
    });
    invite.save(function(err) {
      if (err) { return next(err, invite); }
      const inviteData = {
        inviteId: invite.id,
        groupName: req.body.groupName,
        groupId: req.body.groupId,
        invitedByName: req.body.invitingUserName,
        invitedId: req.body.invitingId
      };
      User.findByIdAndUpdate(req.body.invitedId,
      { $push: { pendingGroupInvite: inviteData } },
      { new: true }, function(err, user) {
        if (err) { return next(err); }
        if (user) {
          res.send(user);
        }
      });
    });
  });
}

exports.getInvites = function(req,res,next){
  InviteSchema.find({ groupId: req.params.id }, function(err, invite) {
    if (err) return next(err);
    if (invite) {
      res.send(invite);
      console.log('it worked ahhha')
    } else {
      res.send('didnotwork');
      //res.redirect('/');
    }
});
};
