var FollowUserRequest = require('../models/follow_user_request');
var User = require('../models/user');

exports.createFollowRequest = function(req, res, next) {
  FollowUserRequest.findOne({ followerId: req.body.followerId, followingId: req.body.followingId }, function(err, existingRequest) {
    if (err) { return next(err); }
    if (existingRequest) {
      if (existingRequest.answered == false) {
        return res.status(422).send({ error: 'This user has not accepted or denied your last follow request'})
      } else if (existingRequest.answered == true) {
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
            { $push: { userFollowRequest: followerData } },
            { new: true }, function(err, user) {
              if (err) throw err;
              if (user) {
                return res.send(user);
              }
            });
        });
      }
    }

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
        { new: true }, function(err, user) {
          if (err) throw err;
          if (user) {
            return res.send(user);
          }
        });
    });

  })
}

exports.updateRequest = function(req, res, next) {
  // console.log(req.user);
  console.log('looking for ', req.body.requestId);
  FollowUserRequest.findByIdAndUpdate(req.body.requestId, {
    answered: req.body.approval
  }, { new: true }, function(err, request) {
    if (err) { return next(err); }
    console.log('request = ', request);
    if (request) {
      console.log('...req.user.id = ', req.user.id);
      const removeData = { requestId: req.body.requestId };
      if (req.body.approval == true) {
        const followingData = { requestID: request.followingName, followingId: request.followingId };
        User.findByIdAndUpdate(req.user.id,
          { $push: { followingUsers: followingData } },
          // { $pull: { userFollowRequest: removeData } },
          { new: true }, function(err, user) {
            if (err) { return next(err); }
            if (user) {
              return res.send(user);
            }
        })
      } else {
        console.log('req.user.id = ', req.user.id);
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
/*
  Still unable to delete the userFollowRequest item from the array
*/
