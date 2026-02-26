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

  async filterProducts(filters) {
    const {
      state,
      minPrice,
      maxPrice,
      shop_id,
      category_id,
      keyword,
      page = 1,
      limit = 20
    } = filters;

    const query = {};

    /* ===============================
      MULTI STATUS
    =============================== */
    if (state) {
      const statesArray = state.split(',').map(s => Number(s.trim()));
      query.state = { $in: statesArray };
    }

    /* ===============================
      MULTI CATEGORY
    =============================== */
    if (category_id) {
      const categoriesArray = category_id.split(',').map(id => id.trim());
      query.category_id = { $in: categoriesArray };
    }

    /* ===============================
      MULTI SHOP
    =============================== */
    if (shop_id) {
      const shopsArray = shop_id.split(',').map(id => id.trim());
      query.shop_id = { $in: shopsArray };
    }

    /* ===============================
      PRIX
    =============================== */
    if (minPrice !== undefined || maxPrice !== undefined) {
      query.unit_price = {};

      if (minPrice !== undefined) {
        query.unit_price.$gte = Number(minPrice);
      }

      if (maxPrice !== undefined) {
        query.unit_price.$lte = Number(maxPrice);
      }
    }

    /* ===============================
      KEYWORD
    =============================== */
    if (keyword) {
      query.$or = [
        { name: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } }
      ];
    }

    const skip = (Number(page) - 1) * Number(limit);

    const [products, total] = await Promise.all([
      Product.find(query)
        .populate("shop_id")
        .populate("category_id")
        .skip(skip)
        .limit(Number(limit)),

      Product.countDocuments(query)
    ]);

    return {
      data: products,
      pagination: {
        total,
        page: Number(page),
        limit: Number(limit),
        totalPages: Math.ceil(total / limit)
      }
    };
  }
}

module.exports = new ProductService();
