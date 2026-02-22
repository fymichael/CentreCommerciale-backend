const paymentService = require('../services/payment.service');

exports.createPayment = async (req, res) => {
  try {
    const payment = await paymentService.create(req.body);
    res.status(201).json(payment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getPayments = async (req, res) => {
  try {
    const payments = await paymentService.findAll();
    res.json(payments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getPaymentById = async (req, res) => {
  try {
    const payment = await paymentService.findById(req.params.id);
    if (!payment)
      return res.status(404).json({ message: 'Paiement introuvable' });

    res.json(payment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updatePayment = async (req, res) => {
  try {
    const payment = await paymentService.update(req.params.id, req.body);
    res.json(payment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deletePayment = async (req, res) => {
  try {
    await paymentService.delete(req.params.id);
    res.json({ message: 'Payment supprimé' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
