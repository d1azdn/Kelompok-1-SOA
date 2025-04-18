const express = require('express');
const router = express.Router();
const lokasiRentalController = require('../controllers/lokasiRentalController');

// Menampilkan semua lokasi rental
router.get('/', lokasiRentalController.getAllLokasiRental);

// Mencari lokasi rental berdasarkan kata kunci alamat
router.get('/search', lokasiRentalController.searchLokasiRental);

// Mencari lokasi rental berdasarkan provinsi
router.get('/provinsi/search', lokasiRentalController.searchLokasiRentalByProvinsi);

// Mendapatkan daftar provinsi yang tersedia
router.get('/provinsi/list', lokasiRentalController.getDaftarProvinsi);

// Menampilkan detail lokasi rental berdasarkan ID pemilik
router.get('/:id_pemilik', lokasiRentalController.getLokasiRentalById);

module.exports = router; 