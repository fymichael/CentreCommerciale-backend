const express = require('express');
const router = express.Router();
const controller = require('../controllers/paymentType.controller');

router.post('/', controller.createPaymentType);
router.get('/', controller.getPaymentTypes);
router.get('/:id', controller.getPaymentTypeById);
router.put('/:id', controller.updatePaymentType);
router.delete('/:id', controller.deletePaymentType);

module.exports = router;