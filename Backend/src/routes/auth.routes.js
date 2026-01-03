const express = require('express');
const authController = require('../controllers/auth.controllers');
const { validateSignup, validateLogin, authCheck } = require('../middlewares/auth.middlewares');

const router = express.Router();

router.post('/signup', validateSignup, authController.signup);
router.post('/login', validateLogin, authController.login);
router.get('/me', authCheck, (req,res) => {
    return res.status(200).json({
        user: {
            id: req.user.userId,
            email: req.user.email
        }
    });
})

module.exports = router