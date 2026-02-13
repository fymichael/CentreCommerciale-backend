const shopService = require('../services/shop.service');

exports.createShop = async (req, res) => {
  try {
    const shop = await shopService.create(req.body);
    res.status(201).json(shop);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getShops = async (req, res) => {
  try {
    const shops = await shopService.findAll();
    res.json(shops);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getShopById = async (req, res) => {
  try {
    const shop = await shopService.findById(req.params.id);
    if (!shop)
      return res.status(404).json({ message: 'Boutique introuvable' });

    res.json(shop);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateShop = async (req, res) => {
  try {
    const shop = await shopService.update(req.params.id, req.body);
    res.json(shop);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteShop = async (req, res) => {
  try {
    await shopService.delete(req.params.id);
    res.json({ message: 'Shop supprimé' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
