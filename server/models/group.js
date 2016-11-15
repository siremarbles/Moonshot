const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const groupSchema = new Schema({
  name: String,
  members: [
    {
      name: String,
      userId: String
    }
  ],
  admins: { admins: { name: String, userId: String, datePromoted: Date } },
  maxMembers: Number,
  funds_max: Number,
  funds_remaining: Number,
  dateCreated: Date
});

const GroupClass = mongoose.model('group', groupSchema);

module.exports = GroupClass;
