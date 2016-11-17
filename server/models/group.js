const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const groupSchema = new Schema({
  name: String,
  members: [{
    name: String,
    userId: String
  }],
  admins: { admins: { name: String, userId: String, datePromoted: Date } },
  maxMembers: Number,
  max_funds: Number,
  funds_remaining: Number,
  dateCreated: Date,
  max_members: { type: Number, default: 12 },
  active: { type: Boolean, default: false }
});

const GroupClass = mongoose.model('group', groupSchema);

module.exports = GroupClass;
