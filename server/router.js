const Authentication = require('./controllers/authentication');
const passportService = require('./services/passport');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

module.exports = function(app) {
  app.get('/', requireAuth, function(req, res) {
    res.send({ message: 'you needed a jwt ... you used it ... you have access'});
  });
  app.post('/login', requireSignin, Authentication.login);
  app.post('/signup', Authentication.signup);
}
