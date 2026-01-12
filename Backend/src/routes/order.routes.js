const express = require('express');
const { authCheck, validateUser } = require('../middlewares/auth.middlewares');
const orderController = require('../controllers/order.controllers');

const router = express.Router();


router.use(authCheck);
router.use(validateUser)

router.post('/place',orderController.placeOrder);

module.exports = router


