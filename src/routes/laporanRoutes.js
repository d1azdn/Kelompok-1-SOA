const express = require('express');
const router = express.Router();
const laporanController = require('../controllers/laporanController');

/**
 * @swagger
 * /laporan/penyewa-terbanyak:
 *   get:
 *     summary: Get most renter.
 *     tags: [Laporan]
 *     responses:
 *       200:
 *         description: Data ditemukan.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 total_penyewa:
 *                   type: string
 *                   description: number
 *                 penyewa_terbanyak:
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
// Menampilkan penyewa yang paling sering menyewa mobil
router.get('/penyewa-terbanyak', laporanController.getPenyewaTerbanyak);


/**
 * @swagger
 * /laporan/mobil-paling-laris:
 *   get:
 *     summary: Get most rented car.
 *     tags: [Laporan]
 *     responses:
 *       200:
 *         description: Data ditemukan.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 total_mobil:
 *                   type: string
 *                   description: number
 *                 mobil_paling_laris:
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
// Menampilkan mobil yang paling sering disewa
router.get('/mobil-paling-laris', laporanController.getMobilPalingLaris);


/**
 * @swagger
 * /laporan/denda-terbesar:
 *   get:
 *     summary: Get most taxed rental.
 *     tags: [Laporan]
 *     responses:
 *       200:
 *         description: Data ditemukan.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 total_rental:
 *                   type: string
 *                   description: number
 *                 denda_terbesar:
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
// Menampilkan data rental dengan total denda terbesar
router.get('/denda-terbesar', laporanController.getDendaTerbesar);

module.exports = router; 