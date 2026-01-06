const express = require('express');
const { authCheck, validateUser } = require('../middlewares/auth.middlewares');
const cartController = require('../controllers/cart.controllers');
const router = express.Router();

router.use(authCheck);
router.use(validateUser)

router.get('/', cartController.getCart);
router.post('/add', cartController.addToCart);
router.post('/delete', cartController.removeFromCart);
router.patch('/quantity', cartController.updateCartQuantity);

module.exports = router