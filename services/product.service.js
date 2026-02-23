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

    async filterProducts(minPrice, maxPrice) {
      try {

        let mongoQuery = {};

        if (minPrice || maxPrice) {
          mongoQuery.unit_price = {};
          if (minPrice) {
            mongoQuery.unit_price.$gte = Number(minPrice);
          }
          if (maxPrice) {
            mongoQuery.unit_price.$lte = Number(maxPrice);
          }
        }

        // 4. Logique pour la condition (Type de boutique)
        // if (condition && condition !== 'all') {
        //   // Si tu stockes 'new' ou 'used' dans ton modèle Product
        //   mongoQuery.condition = condition; 
        // }

        // 5. Exécution de la requête sur MongoDB
        console.log("Recherche MongoDB avec :", mongoQuery);
        const filteredProducts = await Product.find(mongoQuery)
          .populate('shop_id')
          .populate('category_id');

        return filteredProducts;

      } catch (error) {
        console.error("Erreur lors du filtrage :", error);
      }
    };

  async searchProduct(queryText) {
    if (!queryText) return [];

    // limitation a 3 mots pour la recherche
    const words = queryText
      .trim()
      .split(/\s+/)
      .slice(0, 3);

    const regexQueries = words.map(word => {
      const escaped = word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      return new RegExp(escaped, 'i');
    });

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
    .populate('shop_id')
    .populate('category_id')
    .limit(20);
  }

}

module.exports = new ProductService();
