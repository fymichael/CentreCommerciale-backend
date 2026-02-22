const Product = require('../models/Product');
const mongoose = require('mongoose');

class ProductService {

  async create(data) {
    return await Product.create(data);
  }

  async findAll() {
    return await Product.find()
      .populate('shop_id')
      .populate('category_id');
  }

  async findById(id) {
    return await Product.findById(id)
      .populate('shop_id')
      .populate('category_id');
  }

  async update(id, data) {
    return await Product.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id) {
    return await Product.findByIdAndDelete(id);
  }

  async findByCategory(idCategory) {
    return await Product.find({ "category_id": idCategory })
      .populate('shop_id')
      .populate('category_id');
  }

  async searchProduct(queryText) {
    if (!queryText) return [];

  // 1. Nettoyage et limitation à 3 mots
  const words = queryText
    .trim()
    .split(/\s+/)
    .slice(0, 3);

  // 2. Préparation des Regex sécurisées
  const regexQueries = words.map(word => {
    const escaped = word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return new RegExp(escaped, 'i');
  });

  // 3. Construction de la requête $and / $or
  const query = {
    $or: regexQueries.map(regex => ({
      $or: [
        { name: regex },
        { description: regex },
        { 'shop_id.name': regex },
        { 'category_id.name': regex }
      ]
    }))
  };

  return await Product.find(query)
    .populate('shop_id') // On récupère juste le nom de la boutique
    .populate('category_id')
    .limit(20);
  }

}

module.exports = new ProductService();
