const Authentication = require('./controllers/authentication');
const passportService = require('./services/passport');
const passport = require('passport');
const Resources = require('./controllers/resources');
const multer = require('multer');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

const uploading = multer({
  dest: 'uploads/'
})

module.exports = function(app) {
  app.get('/', requireAuth, function(req, res) {
    res.send({ message: 'super secret code is abc1234' });
  });
  app.post('/signin', requireSignin, Authentication.signin);
  app.post('/signup', Authentication.signup);
  app.post('/upload', uploading.single('files'), Resources.upload);
  app.post('/sign', Authentication.sign);
};
