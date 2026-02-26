const Product = require('../models/Product');

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
