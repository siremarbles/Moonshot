const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const activitySchema = new Schema({
  //hold the groupname,userid,userpic,username and comment made by user
  groupname: String,
  collection_name: String,

  userId: String,
  groupid: String,

  username: String,
  userpic: String,
  comment: String,
  date: {type:Date, default: Date.now}
});

const ActivityClass = mongoose.model('activity', activitySchema);

module.exports = ActivityClass;
