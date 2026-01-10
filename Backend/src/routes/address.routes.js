const express = require('express');

const { authCheck, validateUser } = require('../middlewares/auth.middlewares');
const addressController = require('../controllers/address.controllers');
const router = express.Router();

router.use(authCheck);
router.use(validateUser);

router.get('/', addressController.getAllAddresses);
router.post('/', addressController.addNewAddress);
router.delete('/', addressController.deleteAddress);
router.patch('/', addressController.editAddress);

module.exports = router