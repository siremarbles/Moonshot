const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//2016-12-15 20:27:23.392Z
//2016-12-15 20:27:23.392Z

const groupSchema = new Schema({
  name: String,
  members: [{
    name: String,
    userId: String,
    dateJoined:  {type:Date, default: Date.now}
  }],
  admins: { admins: { name: String, userId: String, datePromoted: Date } },
  maxMembers: Number,
  max_funds: Number,
  funds_remaining: Number,
  dateCreated: {type:Date, default: Date.now},
  createdBy: {firstName: String, lastName: String, userId: String},
  max_members: { type: Number, default: 12 },
  active: { type: Boolean, default: false }
});

const GroupClass = mongoose.model('group', groupSchema);

module.exports = GroupClass;
