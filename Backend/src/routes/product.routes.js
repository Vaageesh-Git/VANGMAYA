const express = require('express');
const productController = require('../controllers/product.controllers');
const { validateSlug, validateCategorySlug } = require('../middlewares/product.middleware');
const router = express.Router();

router.get('/:slug',validateSlug, productController.getProductBySlug);
router.get('/',validateCategorySlug, productController.getProductsByCategory)

module.exports = router