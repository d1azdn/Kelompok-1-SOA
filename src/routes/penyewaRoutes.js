const express = require('express');
const router = express.Router();
const penyewaController = require('../controllers/penyewaController');

router.get('/', penyewaController.getAllPenyewa);
router.get('/:id_penyewa', penyewaController.getPenyewaById);
router.post('/', penyewaController.createPenyewa);
router.put('/:id_penyewa', penyewaController.updatePenyewa);
router.delete('/:id_penyewa', penyewaController.deletePenyewa);

module.exports = router;
