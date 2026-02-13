const express = require('express');
const router = express.Router();
const controller = require('../controllers/product.controller');
const upload = require('../middlewares/upload.middleware');

router.get('/', controller.getProducts);
router.get('/:id', controller.getProductById);
router.put('/:id', upload.single('image'), controller.updateProduct);
router.delete('/:id', controller.deleteProduct);
router.post(
  '/',
  upload.single('image'),
  controller.createProduct
);

module.exports = router;
