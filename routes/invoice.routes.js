const express = require('express');
const router = express.Router();
const controller = require('../controllers/invoice.controller');

router.post('/', controller.createInvoice);
router.get('/', controller.getInvoices);
router.get('/:id', controller.getInvoiceById);
router.put('/:id', controller.updateInvoice);
router.delete('/:id', controller.deleteInvoice);

module.exports = router;