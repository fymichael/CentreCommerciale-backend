const express = require('express');
const router = express.Router();
const controller = require('../controllers/dashboard.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const authorize = require('../middlewares/authorize');

router.get(
    '/:year',
    authMiddleware,
    authorize(["Admin mall", "Admin shop"]),
    controller.getDashboard
);

module.exports = router;