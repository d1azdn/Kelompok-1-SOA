const express = require('express');
const router = express.Router();
const detailTransaksiPenyewaanController = require('../controllers/detailTransaksiPenyewaanController');

router.get('/:id_rental', detailTransaksiPenyewaanController.getDetailTransaksiPenyewaan);

module.exports = router;
