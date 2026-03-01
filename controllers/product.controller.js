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

exports.getFilterResults = async (req, res) => {
  try {
    const { minPrice, maxPrice } = req.query;

    // Appel du service
    const products = await productService.filterProducts(minPrice, maxPrice);
    
    console.log(products);
    res.status(200).json(products);
  } catch (error) {
    console.error('Erreur filtre:', error);
    res.status(500).json({ message: "Erreur lors du filtrage" });
  }
}

exports.getSearchingResults = async (req, res) => {
  try {
    const term = req.query.q;
    
    // Appel du service
    const products = await productService.searchProduct(term);
    
    res.status(200).json(products);
  } catch (error) {
    console.error('Erreur recherche:', error);
    res.status(500).json({ message: "Erreur lors de la recherche" });
  }
}

exports.getProductByShop = async (req, res) => {
  try {
    const product = await productService.findByShop(req.params.idShop);
    if (!product || product.length == 0) return res.status(404).json({ message: 'Aucun Produit relier a ce shop' });

    console.log(product);
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

exports.getProductByCategory = async (req, res) => {
  try {
    const product = await productService.findByCategory(req.params.idCategory);
    if (!product || product.length == 0) return res.status(404).json({ message: 'Aucune Produit dans cette categories' });

    console.log(product);
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

exports.createProduct = async (req, res) => {
  try {
    const {
      code,
      name,
      description,
      unit_price,
      discount_rate,
      shop_id,
      category_id,
      variant,         
      build_material,  
      quality,
      state,
      color          
    } = req.body;

    const image = req.file ? req.file.path : null;

    const productData = {
      code,
      name,
      description,
      unit_price,
      discount_rate,
      category_id,
      shop_id,
      variant,
      build_material,
      quality,
      state: state || 1,
      image,
      color
    };

    const product = new Product(productData);
    await product.save();

    res.status(201).json(product);

  } catch (error) {
    console.error("Erreur Backend Cloudinary:", error);
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
