const Authentication = require('./controllers/authentication');
const passportService = require('./services/passport');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });


var userController = require('./controllers/user_controller');
var groupController = require('./controllers/group_controller');
var followUserRequestController = require('./controllers/follow_user_request_controller');
var inviteToGroupController = require('./controllers/invite_to_group_controller');

var dwolla_controller = require('./controllers/dwolla_controller_2');
module.exports = function(app) {
//GET
  app.get('/', requireAuth, function(req, res) {
            res.send({ message: 'you needed a jwt ... you used it ... you have access'});
          });
  app.get('/profile/:id', requireAuth, userController.getUserData);
  app.get('/all-users', requireAuth, userController.fetchAllUsers);
  app.get('/profile-data', requireAuth, userController.getProfileData);
  app.get('/group/:id', requireAuth, groupController.getGroupData);
  app.get('/groups', requireAuth, groupController.getGroups);
  app.get('/invites', requireAuth, inviteToGroupController.getInvites);

//POST
  app.post('/login', requireSignin, Authentication.login);
  app.post('/signup', Authentication.signup);
  app.post('/profile/updateV1/:id', requireAuth, userController.updateV1Details);
  app.post('/user/ccinfo/:id', requireAuth, userController.updateCreditCard);

  app.post('/create-group', requireAuth, groupController.createGroup);
  app.post('/group-add-user', requireAuth, groupController.addUserToGroup);
  app.post('/invite-to-group', requireAuth, inviteToGroupController.sendInvite);

  app.post('/request-follow-user', requireAuth, followUserRequestController.createFollowRequest);
  app.post('/update-request-follow-user', requireAuth, followUserRequestController.updateRequest);

  //dwolla  exports.getDwollaRoot
  app.get('/dwollauser', requireAuth, dwolla_controller.getDwollaRoot);
  app.post('/dwollauser', requireAuth, dwolla_controller.createDwollaUser);


//PUT
  app.put('/update-user-privacy', requireAuth, userController.changeProfilePrivacy);

}
