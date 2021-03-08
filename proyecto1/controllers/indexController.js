const indexCtrl = {};
const passport = require('passport');

indexCtrl.renderIndex = (req, res) => {
    res.render('index');
};

indexCtrl.renderSignUp = (req, res) => {
    res.render('auth/signup');
};

indexCtrl.signUp = passport.authenticate('local.signup', {
    successRedirect: '/profile',
    failureRedirect: '/signup',
    failureFlash: true
});

indexCtrl.renderSignIn = (req, res, next) => {
    res.render('auth/signin');
};

indexCtrl.signIn = passport.authenticate('local.signin', {
    successRedirect: '/profile',
    failureRedirect: '/signin',
    failureFlash: true
});

indexCtrl.renderUserProfile = (req, res, next) => {
    res.render('profile');
  }

indexCtrl.logout = (req, res, next) => {
    req.logOut();
    res.redirect('/');
};


module.exports = indexCtrl;