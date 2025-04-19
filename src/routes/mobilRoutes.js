const express = require('express');
const router = express.Router();
const mobilController = require('../controllers/mobilController');

/**
 * @swagger
 * /mobil/:
 *   get:
 *     summary: Get all car.
 *     tags: [Mobil]
 *     responses:
 *       200:
 *         description: Data ditemukan.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 car:
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
router.get('/', mobilController.getAllMobil);

/**
 * @swagger
 * /mobil/{id_mobil}:
 *   get:
 *     summary: Get specific car.
 *     tags: [Mobil]
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
 *                 car:
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
router.get('/:id_mobil', mobilController.getMobilById);

/**
 * @swagger
 * /mobil/:
 *   post:
 *     summary: Register new car
 *     tags: [Mobil]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - plat_nomor
 *               - nama
 *               - merek
 *               - model
 *               - transmisi
 *               - tahun
 *               - warna
 *               - bahan_bakar
 *               - harga_sewa
 *               - status
 *               - id_pemilik
 *             properties:
 *               plat_nomor:
 *                 type: string
 *                 example: example
 *               nama:
 *                 type: string
 *                 example: example
 *               merek:
 *                 type: string
 *                 example: example
 *               model:
 *                 type: string
 *                 example: example
 *               transmisi:
 *                 type: string
 *                 example: example
 *               tahun:
 *                 type: string
 *                 example: example
 *               warna:
 *                 type: string
 *                 example: example
 *               bahan_bakar:
 *                 type: string
 *                 example: example
 *               harga_sewa:
 *                 type: string
 *                 example: example
 *               status:
 *                 type: string
 *                 example: example
 *               id_pemilik:
 *                 type: string
 *                 example: example
 *     responses:
 *       200:
 *         description: Berhasil registrasi.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Car updated succesfully.
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
router.post('/', mobilController.createMobil);

/**
 * @swagger
 * /mobil/{id_mobil}:
 *   put:
 *     summary: Edit existing car
 *     tags: [Mobil]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - plat_nomor
 *               - nama
 *               - merek
 *               - model
 *               - transmisi
 *               - tahun
 *               - warna
 *               - bahan_bakar
 *               - harga_sewa
 *               - status
 *               - id_pemilik
 *             properties:
 *               plat_nomor:
 *                 type: string
 *                 example: example
 *               nama:
 *                 type: string
 *                 example: example
 *               merek:
 *                 type: string
 *                 example: example
 *               model:
 *                 type: string
 *                 example: example
 *               transmisi:
 *                 type: string
 *                 example: example
 *               tahun:
 *                 type: string
 *                 example: example
 *               warna:
 *                 type: string
 *                 example: example
 *               bahan_bakar:
 *                 type: string
 *                 example: example
 *               harga_sewa:
 *                 type: string
 *                 example: example
 *               status:
 *                 type: string
 *                 example: example
 *               id_pemilik:
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
 *                   example: Car updated succesfully.
 *       404:
 *         description: Car not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Car not found.
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
router.put('/:id_mobil', mobilController.updateMobil);

/**
 * @swagger
 * /mobil/{id_mobil}:
 *   delete:
 *     summary: Delete specific car.
 *     tags: [Mobil]
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
 *         description: Data telah dihapus.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 car:
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
router.delete('/:id_mobil', mobilController.deleteMobil);

module.exports = router;