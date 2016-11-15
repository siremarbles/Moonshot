var Group = require('../models/group');
var User = require('../models/user');


exports.createGroup = function(req, res, next) {
  Group.findOne({ name: req.body.groupName }, function(err, existingGroup) {
    if (err) { return next(err); }
    if (existingGroup) {
      return res.status(422).send({ error: 'A group already exists by that name'});
    }
    const group = new Group({
      name: req.body.groupName,
      members: [{ name: req.user.firstName, id: req.params.id }]
    });
    group.save(function(err) {
      if (err) { return next(err, group); }

      User.findOne({ id: req.params.id }, function(err, user) {
        console.log('check');
        if (err) { return next(err); }
        if (user) {
          console.log(group.name);
          user.groups.push({ groupName: group.name, groupId: group.id });
          user.save(function(err) {
            if (err) return next(err);
            return res.send(user, group);
          })
        }
      })
    })
  });
}

/*
  We need to check if their is a group by the same name
    -if no group create the group

    -get user info ... name

  Call addUserToGroup
    check to see if the user is already in this group

*/
