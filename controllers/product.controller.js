const productService = require('../services/product.service');
const Product = require('../models/Product');
/*
exports.createProduct = async (req, res) => {
  try {
    const product = await productService.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};*/

exports.createProduct = async (req, res) => {
  try {
    const {
      code,
      name,
      unit_price,
      discount_rate,
      category_id,
      state
    } = req.body;

    const image = req.file
      ? `/uploads/products/${req.file.filename}`
      : null;

    const product = new Product({
      code,
      name,
      unit_price,
      discount_rate,
      category_id,
      state,
      image
    });

    await product.save();

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

    const {
      code,
      name,
      unit_price,
      discount_rate,
      category_id,
      state
    } = req.body;

    const updateData = {
      code,
      name,
      unit_price,
      discount_rate,
      category_id,
      state
    };

    if (req.file) {
      updateData.image = `/uploads/products/${req.file.filename}`;
    }

    const product = await productService.update(
      req.params.id,
      updateData
    );
    
    res.json(product);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/*exports.updateProduct = async (req, res) => {
  try {
    const product = await productService.update(req.params.id, req.body);
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};*/

exports.deleteProduct = async (req, res) => {
  try {
    await productService.delete(req.params.id);
    res.json({ message: 'Produit supprimé' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.filterProducts = async (req, res) => {
  try {
    const result = await productService.filterProducts(req.query);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
