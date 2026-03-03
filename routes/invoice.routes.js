const express = require('express');
const router = express.Router();
const controller = require('../controllers/invoice.controller');


router.get('/latest', controller.getLatestInvoice);
router.post('/', controller.createInvoice);
router.get('/', controller.getInvoices);
router.get('/:id', controller.getInvoiceById);
router.put('/:id', controller.updateInvoice);
router.delete('/:id', controller.deleteInvoice);
router.get('/shop/:idShop', controller.getInvoiceByShopId);
router.get('/user/:idUser', controller.getInvoiceByUserId);
router.get('/total/year/:year', controller.getTotalOrdersByYear);

module.exports = router;
module.exports = router;