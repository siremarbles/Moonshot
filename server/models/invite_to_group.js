const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const inviteToGroupSchema = new Schema({
  invitingUserId: String,
  invitingUserName: String,
  invitedUserId: String,
  invitedUserName: String,
  groupId: String,
  groupName: String,
  answered: { type: Boolean, default: false }
})

const InviteToGroupClass = mongoose.model('invite_to_group', inviteToGroupSchema);
module.exports = InviteToGroupClass;
