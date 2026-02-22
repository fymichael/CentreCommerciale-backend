const categoryService = require('../services/category.service');

exports.createCategory = async (req, res) => {
  try {
    const category = await categoryService.create(req.body);
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getCategorys = async (req, res) => {
  try {
    const categorys = await categoryService.findAll();
    res.json(categorys);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getCategoryById = async (req, res) => {
  try {
    const category = await categoryService.findById(req.params.id);
    if (!category)
      return res.status(404).json({ message: 'Categorie introuvable' });

    res.json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const category = await categoryService.update(req.params.id, req.body);
    res.json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    await categoryService.delete(req.params.id);
    res.json({ message: 'Categorie supprimé' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
