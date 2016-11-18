const Authentication = require('./controllers/authentication');
const passportService = require('./services/passport');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });


var userController = require('./controllers/user_controller');
var groupController = require('./controllers/group_controller');

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



//POST
  app.post('/login', requireSignin, Authentication.login);
  app.post('/signup', Authentication.signup);
  app.post('/profile/updateV1/:id', requireAuth, userController.updateV1Details);
  app.post('/user/ccinfo/:id', requireAuth, userController.updateCreditCard);
  app.post('/create-group', requireAuth, groupController.createGroup);

//PUT
  app.put('/update-user-privacy', requireAuth, userController.changeProfilePrivacy);

}
