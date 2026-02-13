const express = require('express');
const router = express.Router();
const controller = require('../controllers/shop.controller');

router.post('/', controller.createShop);
router.get('/', controller.getShops);
router.get('/:id', controller.getShopById);
router.put('/:id', controller.updateShop);
router.delete('/:id', controller.deleteShop);

module.exports = router;