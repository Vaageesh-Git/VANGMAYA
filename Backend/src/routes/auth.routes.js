const express = require('express');
const authController = require('../controllers/auth.controllers');
const { validateSignup, validateLogin } = require('../middlewares/auth.middleware');

const router = express.Router();

router.post('/signup', validateSignup, authController.signup);
router.post('/login', validateLogin, authController.login);

module.exports = router