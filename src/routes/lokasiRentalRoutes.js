const express = require('express');
const router = express.Router();
const lokasiRentalController = require('../controllers/lokasiRentalController');

/**
 * @swagger
 * /lokasi-rental/:
 *   get:
 *     summary: Get all user location.
 *     tags: [Lokasi Rental]
 *     responses:
 *       200:
 *         description: Data ditemukan.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 total_lokasi:
 *                   type: string
 *                   description: number
 *                 lokasi_rental:
 *                   type: object
 *                   description: data
 *       505:
 *         description: Error response.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: object
 */
// Menampilkan semua lokasi rental
router.get('/', lokasiRentalController.getAllLokasiRental);


/**
 * @swagger
 * /lokasi-rental/search/{alamat}:
 *   get:
 *     summary: Get user location based on alamat.
 *     tags: [Lokasi Rental]
 *     parameters:
 *       - in: path
 *         name: alamat
 *         example: example
 *         required: true
 *         description: alamat.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Data ditemukan.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 alamat_detail:
 *                   type: string
 *                   description: number
 *       505:
 *         description: Error response.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: object
 */
// Mencari lokasi rental berdasarkan kata kunci alamat
router.get('/search', lokasiRentalController.searchLokasiRental);


/**
 * @swagger
 * /lokasi-rental/provinsi/search/{provinsi}:
 *   get:
 *     summary: Get user location based on provinsi.
 *     tags: [Lokasi Rental]
 *     parameters:
 *       - in: path
 *         name: provinsi
 *         example: example
 *         required: true
 *         description: provinsi.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Data ditemukan.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 alamat_detail:
 *                   type: object
 *       505:
 *         description: Error response.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: object
 */
// Mencari lokasi rental berdasarkan provinsi
router.get('/provinsi/search', lokasiRentalController.searchLokasiRentalByProvinsi);


/**
 * @swagger
 * /lokasi-rental/provinsi/list:
 *   get:
 *     summary: Get all Provinsi location.
 *     tags: [Lokasi Rental]
 *     responses:
 *       200:
 *         description: Data ditemukan.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 total_provinsi:
 *                   type: string
 *                   description: number
 *                 daftar_provinsi:
 *                   type: object
 *                   description: data
 *       505:
 *         description: Error response.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: object
 */
// Mendapatkan daftar provinsi yang tersedia
router.get('/provinsi/list', lokasiRentalController.getDaftarProvinsi);


/**
 * @swagger
 * /lokasi-rental/{id_renter}:
 *   get:
 *     summary: Get specific user location.
 *     tags: [Lokasi Rental]
 *     parameters:
 *       - in: path
 *         name: id_renter
 *         example: example
 *         required: true
 *         description: ID penyewa.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Data ditemukan.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 lokasi_rental:
 *                   type: string
 *                   description: number
 *       505:
 *         description: Error response.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: object
 */
// Menampilkan detail lokasi rental berdasarkan ID pemilik
router.get('/:id_pemilik', lokasiRentalController.getLokasiRentalById);

module.exports = router; 