const paymentTypeService = require('../services/paymentType.service');

exports.createPaymentType = async (req, res) => {
  try {
    const paymentType = await paymentTypeService.create(req.body);
    res.status(201).json(paymentType);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getPaymentTypes = async (req, res) => {
  try {
    const paymentType = await paymentTypeService.findAll();
    res.json(paymentType);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getPaymentTypeById = async (req, res) => {
  try {
    const paymentType = await paymentTypeService.findById(req.params.id);
    if (!paymentType)
      return res.status(404).json({ message: 'Type paiement introuvable' });

    res.json(paymentType);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updatePaymentType = async (req, res) => {
  try {
    const paymentType = await paymentTypeService.update(req.params.id, req.body);
    res.json(paymentType);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deletePaymentType = async (req, res) => {
  try {
    await paymentTypeService.delete(req.params.id);
    res.json({ message: 'Type paiements supprimé' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
