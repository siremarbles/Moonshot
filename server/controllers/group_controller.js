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
      User.findByIdAndUpdate(req.user.id,
        { groups: [{ groupName: group.name, groupId: group.id }] },
         { new: true }, function(err, user) {
        if (err) throw err;
        if (user) {
          const returnData = { group: group, user: user };
          return res.send(returnData);
        }
      })
    })
  });
}

exports.addUserToGroup = function(req, res, next) {
  console.log('req.body = ', req.body);
  Group.findOne({ _id: req.body.groupId }, function(err, group) {
    if (err) { return next(err); }
    if (group) {
      console.log('group = ', group);
      var memb = group.members;
      var reqId = req.body.id;
      if (memb.length == group.max_members) {
        return res.status(422).send({ error: 'This group is currently full, another member cannot be added.' });
      }
      for (i = memb.length; i <= 0; i--) {
        if (memb[i].id == reqId) {
          return res.status(422).send({ error: 'You cannot join a group that you are already part of.' });
        }
      }
      User.findOne({ _id: req.body.userId }, function(err, user) {
        if (err) { return next(err); }
        if (user) {
          console.log('user = ', user);
          user.groups.push({ groupName: group.name, groupId: group.id });
          user.save(function(err) {
            if (err) { return next(err); }
            console.log('user saved');
            group.save(function(err) {
              console.log('group saved');
              if (err) { return next(err); }
              return res.send(group);
            })
          })
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
