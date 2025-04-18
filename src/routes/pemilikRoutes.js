const express = require('express');
const router = express.Router();
const pemilikController = require('../controllers/pemilikController');

router.get('/', pemilikController.getAllPemilik);
router.get('/:id_pemilik', pemilikController.getPemilikById);
router.post('/', pemilikController.createPemilik);
router.put('/:id_pemilik', pemilikController.updatePemilik);
router.delete('/:id_pemilik', pemilikController.deletePemilik);

module.exports = router;