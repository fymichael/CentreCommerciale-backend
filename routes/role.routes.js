const express = require('express');
const router = express.Router();
const controller = require('../controllers/role.controller');

router.post('/', controller.createRole);
router.get('/', controller.getRoles);
router.get('/:id', controller.getRoleById);
router.put('/:id', controller.updateRole);
router.delete('/:id', controller.deleteRole);

module.exports = router;