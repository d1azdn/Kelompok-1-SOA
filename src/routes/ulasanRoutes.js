const express = require('express');
const router = express.Router();
const ulasanController = require('../controllers/ulasanController');

router.get('/', ulasanController.getAllUlasan);
router.get('/:id_ulasan', ulasanController.getUlasanById);
router.post('/', ulasanController.createUlasan);
router.put('/:id_ulasan', ulasanController.updateUlasan);
router.delete('/:id_ulasan', ulasanController.deleteUlasan);

module.exports = router;
