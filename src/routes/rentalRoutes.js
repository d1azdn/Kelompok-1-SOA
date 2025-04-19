const express = require('express');
const router = express.Router();
const rentalController = require('../controllers/rentalController');

/**
 * @swagger
 * /rental/:
 *   get:
 *     summary: Get all rental.
 *     tags: [Rental]
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
router.get('/', rentalController.getAllRental);

/**
 * @swagger
 * /rental/{id_rental}:
 *   get:
 *     summary: Get specific rental.
 *     tags: [Rental]
 *     parameters:
 *       - in: path
 *         name: id_rental
 *         example: example
 *         required: true
 *         description: id_rental.
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
router.get('/:id_rental', rentalController.getRentalById);

/**
 * @swagger
 * /rental/:
 *   post:
 *     summary: Register new rental
 *     tags: [Rental]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id_rental
 *               - tanggal_mulai
 *               - tanggal_selesai
 *               - biaya
 *               - metode_pembayaran
 *               - status_pembayaran
 *               - id_penyewa
 *               - id_mobil
 *             properties:
 *               id_rental:
 *                 type: string
 *                 example: example
 *               tanggal_mulai:
 *                 type: string
 *                 example: example
 *               tanggal_selesai:
 *                 type: string
 *                 example: example
 *               biaya:
 *                 type: string
 *                 example: example
 *               metode_pembayaran:
 *                 type: string
 *                 example: example
 *               status_pembayaran:
 *                 type: string
 *                 example: example
 *               id_penyewa:
 *                 type: string
 *                 example: example
 *               id_mobil:
 *                 type: string
 *                 example: example
 *     responses:
 *       201:
 *         description: Rental added successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Rental added successfully.
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Internal server error.
 */
router.post('/', rentalController.createRental);

/**
 * @swagger
 * /rental/{id_rental}:
 *   put:
 *     summary: Edit existing rental
 *     tags: [Rental]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id_rental
 *               - tanggal_mulai
 *               - tanggal_selesai
 *               - biaya
 *               - metode_pembayaran
 *               - status_pembayaran
 *               - id_penyewa
 *               - id_mobil
 *             properties:
 *               id_rental:
 *                 type: string
 *                 example: example
 *               tanggal_mulai:
 *                 type: string
 *                 example: example
 *               tanggal_selesai:
 *                 type: string
 *                 example: example
 *               biaya:
 *                 type: string
 *                 example: example
 *               metode_pembayaran:
 *                 type: string
 *                 example: example
 *               status_pembayaran:
 *                 type: string
 *                 example: example
 *               id_penyewa:
 *                 type: string
 *                 example: example
 *               id_mobil:
 *                 type: string
 *                 example: example
 *     responses:
 *       200:
 *         description: Berhasil edit.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Rental updated succesfully.
 *       404:
 *         description: Rental not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Rental not found.
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Internal server error.
 */
router.put('/:id_rental', rentalController.updateRental);

/**
 * @swagger
 * /rental/{id_rental}:
 *   delete:
 *     summary: Delete specific rental.
 *     tags: [Rental]
 *     parameters:
 *       - in: path
 *         name: id_rental
 *         example: example
 *         required: true
 *         description: id_rental.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Data telah dihapus.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 rental:
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
router.delete('/:id_rental', rentalController.deleteRental);

module.exports = router;
