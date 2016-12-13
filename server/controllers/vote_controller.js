var Vote = require('../models/vote');

exports.postVote = function(req, res, next) {
  Vote.findByIdAndUpdate(req.params.id, {
      voteeID: req.user.id,
      votes: true
    } function(err, vote) {
    if (err) throw err;
    if (user) {
      res.send(vote);
    }
  })
}
