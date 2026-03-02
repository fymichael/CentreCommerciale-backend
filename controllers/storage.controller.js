const storageService = require('../services/storage.service');

exports.addEntry = async (req, res) => {
  try {
    const { productId, quantity, unitCost } = req.body;
    const result = await storageService.addEntry(productId, quantity, unitCost);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.addExit = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const result = await storageService.addExit(productId, quantity);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getStockState = async (req, res) => {
  try {
    const data = await storageService.getStockState();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};