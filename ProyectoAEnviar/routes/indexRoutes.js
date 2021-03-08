const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../modules/auth');


const { renderIndex, renderSignUp, signUp, renderSignIn, signIn, renderUserProfile, logout } = require('../controllers/indexController');


router.get('/', renderIndex); // http://localhost:3001
router.get('/profile', isLoggedIn, renderUserProfile);

// SIGNUP
router.get('/signup', renderSignUp);
router.post('/signup', signUp);

// SINGIN
router.get('/signin', renderSignIn);
router.post('/signin', signIn);
router.get('/logout', logout);

module.exports = router;