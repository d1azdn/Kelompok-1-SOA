const express = require('express');
const router = express.Router();
const laporanController = require('../controllers/laporanController');

// Menampilkan penyewa yang paling sering menyewa mobil
router.get('/penyewa-terbanyak', laporanController.getPenyewaTerbanyak);

// Menampilkan mobil yang paling sering disewa
router.get('/mobil-paling-laris', laporanController.getMobilPalingLaris);

// Menampilkan data rental dengan total denda terbesar
router.get('/denda-terbesar', laporanController.getDendaTerbesar);

module.exports = router; 