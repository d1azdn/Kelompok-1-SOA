const express = require('express');
const router = express.Router();
const {
    getUlasanByMobil,
    getUlasanByPenyewa,
    getMobilTerbaik
} = require('../controllers/ulasanRatingController');


/**
 * @swagger
 * /ulasan-rating/mobil/{id_mobil}:
 *   get:
 *     summary: Get specific ulasan rating mobil detail.
 *     tags: [Ulasan Rating]
 *     parameters:
 *       - in: path
 *         name: id_mobil
 *         example: example
 *         required: true
 *         description: id_mobil.
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
 *                 data:
 *                   type: object
 *       500:
 *         description: Error response.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: object
 */
// Menampilkan seluruh ulasan yang berkaitan dengan satu mobil
router.get('/mobil/:id_mobil', getUlasanByMobil);


/**
 * @swagger
 * /ulasan-rating/penyewa/{id_user}:
 *   get:
 *     summary: Get specific ulasan rating user detail.
 *     tags: [Ulasan Rating]
 *     parameters:
 *       - in: path
 *         name: id_user
 *         example: example
 *         required: true
 *         description: id_user.
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
 *                 data:
 *                   type: object
 *       500:
 *         description: Error response.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: object
 */
// Menampilkan ulasan-ulasan yang diberikan oleh penyewa
router.get('/penyewa/:id_penyewa', getUlasanByPenyewa);


/**
 * @swagger
 * /ulasan-rating/mobil/terbaik:
 *   get:
 *     summary: Get best ulasan.
 *     tags: [Ulasan Rating]
 *     responses:
 *       200:
 *         description: Data ditemukan.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *       500:
 *         description: Error response.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: object
 */
// Menampilkan 5 mobil dengan rata-rata rating tertinggi
router.get('/mobil/terbaik', getMobilTerbaik);

module.exports = router; 