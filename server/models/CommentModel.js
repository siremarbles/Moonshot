const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  //hold the groupname,userid,userpic,username and comment made by user
  groupname: String,
  activity_id: String,
  collection_name: String,

  userid: String,
  groupid: String,

  username: String,
  userpic: String,
  comment: String,
  date: Date
});

const CommentClass = mongoose.model('comment', commentSchema);

module.exports = CommentClass;
