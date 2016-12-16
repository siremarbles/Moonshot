//Project model
var mongoose = require('mongoose');

var projectSchema = new mongoose.Schema({
  //create a new project
  groupname: String,
  funds_request: Number,
  projectname: String,
  userid: String,
  groupid: String,
  paypal_batch_id: String,
  project_description: String,
  username: String,
  userpic: String,
  status: String
});

module.exports = mongoose.model('Funds', fundsSchema);
