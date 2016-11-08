const Authentication = require('./controllers/authentication');
const passportService = require('./services/passport');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });


var userController = require('./controllers/user_controller');

module.exports = function(app) {
//GET
  app.get('/', requireAuth, function(req, res) {
    res.send({ message: 'you needed a jwt ... you used it ... you have access'});
  });
  // app.get('/profile', requireAuth, function(req, res) {
  //   res.send({ messsage: 'you needed to use a jwt token' });
  // })
  app.get('/profile/:id', requireAuth, userController.getProfileData);

//POST
  app.post('/login', requireSignin, Authentication.login);
  app.post('/signup', Authentication.signup);
}
