const express = require('express');
const router = express.Router();
const detailTransaksiPenyewaanController = require('../controllers/detailTransaksiPenyewaanController');

/**
 * @swagger
 * /detailTransaksiPenyewaan/{id_rental}:
 *   get:
 *     summary: Get transaction detail
 *     tags: [Detail Transaksi]
 *     parameters:
 *       - in: path
 *         name: id_rental
 *         example: example
 *         required: true
 *         description: ID rental.
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
 *                 session:
 *                   type: object
 *                   description: data
 *       404:
 *         description: Transaksi tidak ditemukan.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Transaksi tidak ditemukan.
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

router.get('/:id_rental', detailTransaksiPenyewaanController.getDetailTransaksiPenyewaan);

module.exports = router;
