const express = require('express');
const router = express.Router();
const controller = require('../controllers/storage.controller');

router.post('/entry', controller.addEntry);
router.post('/exit', controller.addExit);
router.get('/state', controller.getStockState);

module.exports = router;