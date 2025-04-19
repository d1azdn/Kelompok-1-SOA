const express = require('express');
const router = express.Router();
const ulasanController = require('../controllers/ulasanController');

/**
 * @swagger
 * /ulasan/:
 *   get:
 *     summary: Get all ulasan.
 *     tags: [Ulasan]
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
router.get('/', ulasanController.getAllUlasan);

/**
 * @swagger
 * /ulasan/{id_ulasan}:
 *   get:
 *     summary: Get specific ulasan.
 *     tags: [Ulasan]
 *     parameters:
 *       - in: path
 *         name: id_ulasan
 *         example: example
 *         required: true
 *         description: id_ulasan.
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
router.get('/:id_ulasan', ulasanController.getUlasanById);

/**
 * @swagger
 * /ulasan/:
 *   post:
 *     summary: Register new ulasan
 *     tags: [Ulasan]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id_ulasan
 *               - id_penyewa
 *               - id_mobil
 *               - rating
 *               - komentar
 *             properties:
 *               id_ulasan:
 *                 type: string
 *                 example: example
 *               id_penyewa:
 *                 type: string
 *                 example: example
 *               id_mobil:
 *                 type: string
 *                 example: example
 *               rating:
 *                 type: string
 *                 example: example
 *               komentar:
 *                 type: string
 *                 example: example
 *     responses:
 *       201:
 *         description: Ulasan added successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Ulasan added successfully.
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
router.post('/', ulasanController.createUlasan);

/**
 * @swagger
 * /ulasan/{id_ulasan}:
 *   put:
 *     summary: Edit existing ulasan
 *     tags: [Ulasan]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id_ulasan
 *               - id_penyewa
 *               - id_mobil
 *               - rating
 *               - komentar
 *             properties:
 *               id_ulasan:
 *                 type: string
 *                 example: example
 *               id_penyewa:
 *                 type: string
 *                 example: example
 *               id_mobil:
 *                 type: string
 *                 example: example
 *               rating:
 *                 type: string
 *                 example: example
 *               komentar:
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
 *                   example: Ulasan updated succesfully.
 *       404:
 *         description: Ulasan not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Ulasan not found.
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
router.put('/:id_ulasan', ulasanController.updateUlasan);

/**
 * @swagger
 * /ulasan/{id_ulasan}:
 *   delete:
 *     summary: Delete specific ulasan.
 *     tags: [Ulasan]
 *     parameters:
 *       - in: path
 *         name: id_ulasan
 *         example: example
 *         required: true
 *         description: id_ulasan.
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
router.delete('/:id_ulasan', ulasanController.deleteUlasan);

module.exports = router;
