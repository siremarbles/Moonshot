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
      members: [{ name: req.user.firstName, id: req.user.id }]
    });
    group.save(function(err) {
      if (err) { return next(err, group); }
      var groupData = { groupName: group.name, groupId: group.id };
      console.log('groupData = ', groupData);
      User.findByIdAndUpdate(req.user.id,
         { $push: { groups: groupData } },
         { new: true }, function(err, user) {
        if (err) throw err;
        if (user) {
          const returnData = { group: group, user: user };
          return res.send(returnData);
        }
      });
    });
  });
}

exports.addUserToGroup = function(req, res, next) {
  const userData = { name: req.user.firstName, userId: req.user._id };
  console.log('userData = ', userData);
  Group.findByIdAndUpdate(req.body.groupId,
    { $push: { members: userData } },
    { new: true }, function(err, group) {
      if (err) throw err;
      if (group) {
        var groupData = { groupName: group.name, groupId: group.id };
        User.findByIdAndUpdate(req.user.id,
          { $push: { groups: groupData } },
          { new: true }, function(err, user) {
            if (err) throw err;
            if (user) {
              const returnData = { group: group, user: user };
              return res.send(returnData);
            }
          });
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
