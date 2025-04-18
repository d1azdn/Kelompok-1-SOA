const express = require('express');
const router = express.Router();
const {
    getUlasanByMobil,
    getUlasanByPenyewa,
    getMobilTerbaik
} = require('../controllers/ulasanRatingController');

// Menampilkan seluruh ulasan yang berkaitan dengan satu mobil
router.get('/mobil/:id_mobil', getUlasanByMobil);

// Menampilkan ulasan-ulasan yang diberikan oleh penyewa
router.get('/penyewa/:id_penyewa', getUlasanByPenyewa);

// Menampilkan 5 mobil dengan rata-rata rating tertinggi
router.get('/mobil/terbaik', getMobilTerbaik);

module.exports = router; 