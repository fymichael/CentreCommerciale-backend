const express = require('express');
const router = express.Router();
const controller = require('../controllers/subscriptionShop.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const authorize = require('../middlewares/authorize');

router.post(
    '/', 
    authMiddleware,
    authorize(["Admin mall"]),
    controller.createSubscription
);

router.get(
    '/',
    authMiddleware,
    authorize(["Admin mall", "Admin shop"]),
    controller.getSubscriptions
);

router.get(
    '/:id', 
    authMiddleware,
    authorize(["Admin shop", "Admin mall"]),
    controller.getSubscriptionById
);

router.put(
    '/:id', 
    authMiddleware,
    authorize(["Admin mall"]),
    controller.updateSubscription
);

router.delete(
    '/:id', 
    authMiddleware,
    authorize(["Admin mall"]),
    controller.deleteSubscription
);

router.put(
    '/:id/state', 
    authMiddleware,
    authorize(["Admin mall"]),
    controller.updateSubscriptionState
);

module.exports = router; 