var Group = require('../models/group');
var User = require('../models/user');


exports.createGroup = function(req, res, next) {
  Group.findOne({ name: req.body.groupName }, function(err, existingGroup) {
    if (err) { return next(err); }
    if (existingGroup) {
      return res.status(422).send({ error: 'A Group by that name already exists. Please use a different name.' });
    }
    const group = new Group({
      name: req.body.groupName,
      members: [{ name: req.user.firstName, id: req.params.id }]
    });
    group.save(function(err) {
      if (err) { return next(err, group); }

      User.findOne({ id: req.params.id }, function(err, user) {
        if (err) { return next(err); }
        if (user) {
          user.groups.push({ groupName: group.name, groupId: group.id });
          user.save(function(err) {
            if (err) return next(err);
            const returnData = { group: group, user: user };
            return res.send(returnData);
          })
        }
      })
    })
  });
}

exports.addUserToGroup = function(req, res, next) {
  Group.findOne({ name: req.body.groupName }, function(err, group) {
    if (err) { return next(err); }
    if (group) {
      var memb = group.members;
      var reqId = req.body.id;
      if (memb.length == max_members) {
        return res.status(422).send({ error: 'This group is currently full, another member cannot be added.' });
      }
      for (i = memb.length; i <= 0; i--) {
        if (memb[i].id == reqId) {
          return res.status(422).send({ error: 'You cannot join a group that you are already part of.' });
        }
      }
      group.members.push({ name: req.body.firstName, id: req.params.id })
    }
  });
}

exports.getGroupData = function(req, res, next) {
  Group.findOne({ name: req.params.id }, function(err, group) {
    if (err) { return next(err); }
    if (group) {
      return res.send(group);
    }
  });
}

exports.getGroups = function(req, res, next) {
  Group.find({}, 'name', function(err, groups) {
    if (err) { return next(err); }
    if (groups) {
      res.send(groups);
    }
  })


  // return res.send(Group);
}
