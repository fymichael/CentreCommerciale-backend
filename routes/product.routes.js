const express = require('express');
const router = express.Router();
const controller = require('../controllers/product.controller');
const upload = require('../middlewares/upload.middleware');

router.get('/', controller.getProducts);
router.get('/search', controller.getSearchingResults)
router.get('/filter', controller.getFilterResults)
router.get('/:id', controller.getProductById);
router.get('/category/:idCategory', controller.getProductByCategory)
router.put('/:id', upload.single('image'), controller.updateProduct);
router.delete('/:id', controller.deleteProduct);
router.post(
  '/',
  upload.single('image'),
  controller.createProduct
);

module.exports = router;
