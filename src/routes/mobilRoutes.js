const express = require('express');
const router = express.Router();
const mobilController = require('../controllers/mobilController');

router.get('/', mobilController.getAllMobil);
router.get('/:id_mobil', mobilController.getMobilById);
router.post('/', mobilController.createMobil);
router.put('/:id_mobil', mobilController.updateMobil);
router.delete('/:id_mobil', mobilController.deleteMobil);

module.exports = router;