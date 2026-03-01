const express = require('express');
const router = express.Router();
const controller = require('../controllers/product.controller');
const uploadCloud = require('../cloudinary');

router.get('/search', controller.filterProducts);
router.get('/filter', controller.getFilterResults);

router.get('/shop/:idShop', controller.getProductByShop);

router.get('/category/:idCategory', controller.getProductByCategory);

router.get('/', controller.getProducts);
router.get('/:id', controller.getProductById);

router.put('/:id', uploadCloud.single('image'), controller.updateProduct);
router.delete('/:id', controller.deleteProduct);

router.post('/create', uploadCloud.single('image'), controller.createProduct);

module.exports = router;
