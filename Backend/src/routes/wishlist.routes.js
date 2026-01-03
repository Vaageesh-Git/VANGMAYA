const express = require('express');
const { validateUserAndProduct, validateUser } = require('../middlewares/wishlist.middlewares');
const wishlistController = require('../controllers/wishlist.controllers');
const { authCheck } = require('../middlewares/auth.middlewares');
const router = express.Router();

router.use(authCheck)

router.get('/', validateUser, wishlistController.getWishlist);
router.post('/toggle', validateUserAndProduct, wishlistController.toggleWishlist);
router.get('/ids', wishlistController.getWishlistIds); 

module.exports = router