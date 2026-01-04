const express = require('express');
const { authCheck, validateUser } = require('../middlewares/auth.middlewares');
const cartController = require('../controllers/cart.controllers');
const router = express.Router();

router.use(authCheck);

router.get('/', validateUser, cartController.getCart);

module.exports = router