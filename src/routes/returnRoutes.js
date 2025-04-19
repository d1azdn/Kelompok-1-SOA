const express = require('express');
const router = express.Router();
const returnController = require('../controllers/returnController');

/**
 * @swagger
 * /return/:
 *   get:
 *     summary: Get all return.
 *     tags: [Return]
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
router.get('/', returnController.getAllReturn);

/**
 * @swagger
 * /return/{id_pengembalian}:
 *   get:
 *     summary: Get specific return.
 *     tags: [Return]
 *     parameters:
 *       - in: path
 *         name: id_pengembalian
 *         example: example
 *         required: true
 *         description: id_pengembalian.
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
router.get('/:id_pengembalian', returnController.getReturnById);

/**
 * @swagger
 * /return/:
 *   post:
 *     summary: Register new return
 *     tags: [Return]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id_pengembalian
 *               - id_rental
 *               - tanggal_pengembalian
 *               - denda
 *               - kondisi_mobil
 *             properties:
 *               id_pengembalian:
 *                 type: string
 *                 example: example
 *               id_rental:
 *                 type: string
 *                 example: example
 *               tanggal_pengembalian:
 *                 type: string
 *                 example: example
 *               denda:
 *                 type: string
 *                 example: example
 *               kondisi_mobil:
 *                 type: string
 *                 example: example
 *     responses:
 *       201:
 *         description: Return added successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Return added successfully.
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
router.post('/', returnController.createReturn);

/**
 * @swagger
 * /return/{id_return}:
 *   put:
 *     summary: Edit existing return
 *     tags: [Return]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id_pengembalian
 *               - id_rental
 *               - tanggal_pengembalian
 *               - denda
 *               - kondisi_mobil
 *             properties:
 *               id_pengembalian:
 *                 type: string
 *                 example: example
 *               id_rental:
 *                 type: string
 *                 example: example
 *               tanggal_pengembalian:
 *                 type: string
 *                 example: example
 *               denda:
 *                 type: string
 *                 example: example
 *               kondisi_mobil:
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
 *                   example: Return updated succesfully.
 *       404:
 *         description: Return not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Return not found.
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
router.put('/:id_pengembalian', returnController.updateReturn);

/**
 * @swagger
 * /return/{id_return}:
 *   delete:
 *     summary: Delete specific return.
 *     tags: [Return]
 *     parameters:
 *       - in: path
 *         name: id_return
 *         example: example
 *         required: true
 *         description: id_return.
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
router.delete('/:id_pengembalian', returnController.deleteReturn);

module.exports = router;
