const express = require('express');
const { getProductBySlug } = require('../controllers/product.controllers');
const router = express.Router();

router.get('/:slug', getProductBySlug);

module.exports = router