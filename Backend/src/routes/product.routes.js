const express = require('express');
const { getProductBySlug } = require('../controllers/product.controllers');
const { validateSlug } = require('../middlewares/product.middleware');
const router = express.Router();

router.get('/:slug',validateSlug, getProductBySlug);

module.exports = router