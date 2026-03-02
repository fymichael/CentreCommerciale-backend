const express = require('express');
const router = express.Router();
const controller = require('../controllers/shop.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const authorize = require('../middlewares/authorize');

router.post('/', controller.createShop);
router.get(
    '/', 
    authMiddleware,
    authorize(["Admin mall", "Admin shop"]),
    controller.getShops
);
router.get('/:id', controller.getShopById);
router.put('/:id', controller.updateShop);
router.delete('/:id', controller.deleteShop);

module.exports = router;