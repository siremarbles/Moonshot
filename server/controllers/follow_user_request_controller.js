var FollowUserRequest = require('../models/follow_user_request');
var User = require('../models/user');

exports.createFollowRequest = function(req, res, next) {
  FollowUserRequest.findOne({ followerId: req.body.followerId, followingId: req.body.followingId }, function(err, existingRequest) {
    if (err) { return next(err); }
    if (existingRequest) {
      if (existingRequest.answered == false) {
        return res.status(422).send({ error: 'This user has not accepted or denied your last follow request'});
      } else if (existingRequest.answered == true) {  //create a new request even though user has previously denied request
        const newRequest = new FollowUserRequest({
          followerName: req.body.followerName,
          followingName: req.body.followingName,
          followerId: req.body.followerId,
          followingId: req.body.followingId
        });
        newRequest.save(function(err) {
          if (err) { return next(err, newReq); }
          const followerData = {
            requestId: newRequest.id,
            followerName: newRequest.followerName,
            followerId: newRequest.followerId
          };
          User.findByIdAndUpdate(req.body.followingId,
          { $push: { userFollowRequest: followerData} },
          { new: true }, function(err, userUpdate) {
            if (err) { return next(err); }
            if (userUpdate) {
              User.findOne({ _id: req.body.followerId}, function(err, userFollower) {
                if (err) { return next(err); }
                if (userFollower) {
                  User.findOne({ _id: req.body.followingId }, {
                    email: 1,
                    firstName: 1,
                    lastName: 1,
                    groups: 1,
                    dob: 1,
                    friends: 1,
                    profilePublic: 1,
                    userFollowRequest: 1,
                    usersThatFollow: 1
                  }, function(err, userFollowing) {
                    if (err) { return next(err); }
                    const returnData = { user: userFollower, viewUser: userFollowing };
                    return res.send(returnData);
                  })
                }
              })
            }
          })
        });
      }
    } else {
      const newReq = new FollowUserRequest({
        followerName: req.body.followerName,
        followingName: req.body.followingName,
        followerId: req.body.followerId,
        followingId: req.body.followingId
      });
      newReq.save(function(err) {
        if (err) { return next(err, newReq); }
        const followerData = {
          requestId: newReq.id,
          followerName: newReq.followerName,
          followerId: newReq.followerId
        };
        User.findByIdAndUpdate(req.body.followingId,
          { $push: { userFollowRequest: followerData } },
          { new: true }, function(err, userUpdate) {
            if (err) { return next(err); }
            if (userUpdate) {
              User.findOne({ _id: req.body.followerId }, function(err, userFollower) {
                if (err) { return next(err); }
                if (userFollower) {
                  User.findOne({ _id: req.body.followingId }, {
                    email: 1,
                    firstName: 1,
                    lastName: 1,
                    groups: 1,
                    dob: 1,
                    friends: 1,
                    profilePublic: 1,
                    userFollowRequest: 1,
                    usersThatFollow: 1
                  }, function(err, userFollowing) {
                    if (err) { return next(err); }
                      const returnData = { user: userFollower, viewUser: userFollowing };
                      return res.send(returnData);
                  });
                }
              })
            }
          });
      });
    }
  })
}

exports.updateRequest = function(req, res, next) {
  FollowUserRequest.findByIdAndUpdate(req.body.requestId, {
    answered: true
  }, { new: true }, function(err, request) {
    if (err) { return next(err); }
    if (request) {
      if (req.body.approval == true) {
        const followerData = { followerId: request.followerId, followerName: request.followerName };
        User.findByIdAndUpdate(req.user.id,
          {
            $push: { usersThatFollow: followerData },
            $pull: { userFollowRequest: { _id: req.body.pendingId } },
          },
          { new: true },
          function(err, user) {
            if (err) { return next(err); }
            if (user) {
              const followingData = { followingId: request.followingId, followingName: request.followingName };
              User.findByIdAndUpdate(request.followerId,
                { $push: { followingUsers: followingData } },
                { new: true },
                function(err, userF) {
                  if (err) { return next(err); }
                  if (userF) {
                    return res.send(user);
                  }
                })
            }
        })
      } else {
        const removeData = { _id: req.body.pendingId };
        User.findByIdAndUpdate(req.user.id,
          { $pull: { userFollowRequest: removeData } },
          { new: true }, function(err, user) {
            if (err) { return next(err); }
            if (user) {
              return res.send(user);
            }
        })
      }
    }
  })
}
