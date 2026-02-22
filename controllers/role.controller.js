const roleService = require('../services/role.service');

exports.createRole = async (req, res) => {
  try {
    const role = await roleRole.create(req.body);
    res.status(201).json(role);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getRoles = async (req, res) => {
  try {
    const roles = await roleService.findAll();
    res.json(roles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getRoleById = async (req, res) => {
  try {
    const role = await roleService.findById(req.params.id);
    if (!role)
      return res.status(404).json({ message: 'Rôle introuvable' });

    res.json(role);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateRole = async (req, res) => {
  try {
    const role = await roleService.update(req.params.id, req.body);
    res.json(role);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteRole = async (req, res) => {
  try {
    await roleService.delete(req.params.id);
    res.json({ message: 'Role supprimé' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
