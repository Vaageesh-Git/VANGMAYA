const express = require('express');
const productController = require('../controllers/product.controllers');
const { validateSlug, validateCategorySlug } = require('../middlewares/product.middlewares');
const { validateProductIds } = require('../middlewares/product.middlewares');
const router = express.Router();

router.get('/featured', productController.getFeaturedProducts)
router.get('/:slug',validateSlug, productController.getProductBySlug);
router.get('/',validateCategorySlug, productController.getProductsByCategory);
router.post('/by-ids',validateProductIds, productController.getProductsByIds);

module.exports = router