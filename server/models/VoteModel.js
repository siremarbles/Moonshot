const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const voteSchema = new Schema({
  //hold the groupname,userid,userpic,username and comment made by user
  groupname: String,
  activity_id: String,
  votes: [{
    name: String,
    userId: String
    vote: Boolean
  }],
});

const VoteClass = mongoose.model('vote', voteSchema);

module.exports = VoteClass;
