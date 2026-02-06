const productService = require('../services/product.service');

exports.createProduct = async (req, res) => {
  try {
    const product = await productService.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getProducts = async (req, res) => {
  try {
    const products = await productService.findAll();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await productService.findById(req.params.id);
    if (!product)
      return res.status(404).json({ message: 'Produit introuvable' });

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const product = await productService.update(req.params.id, req.body);
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    await productService.delete(req.params.id);
    res.json({ message: 'Produit supprimé' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
