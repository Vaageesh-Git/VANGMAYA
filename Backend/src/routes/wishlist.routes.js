const express = require('express');
const { validateUserAndProduct, validateUser } = require('../middlewares/wishlist.middlewares');
const wishlistController = require('../controllers/wishlist.controllers');
const router = express.Router();

router.get('/',validateUser, wishlistController.getWishlist);
router.post('/toggle',validateUserAndProduct, wishlistController.toggleWishlist);

module.exports = router