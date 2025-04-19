const express = require('express');
const router = express.Router();
const pemilikController = require('../controllers/pemilikController');

/**
 * @swagger
 * /pemilik/:
 *   get:
 *     summary: Get all user user.
 *     tags: [Pemilik]
 *     responses:
 *       200:
 *         description: Data ditemukan.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
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
router.get('/', pemilikController.getAllPemilik);

/**
 * @swagger
 * /pemilik/{id_user}:
 *   get:
 *     summary: Get specific user.
 *     tags: [Pemilik]
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
 *                 user:
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
router.get('/:id_pemilik', pemilikController.getPemilikById);

/**
 * @swagger
 * /pemilik/:
 *   post:
 *     summary: Register new user
 *     tags: [Pemilik]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id_pemilik
 *               - nama
 *               - alamat
 *               - email
 *               - password
 *               - no_telepon
 *             properties:
 *               id_pemilik:
 *                 type: string
 *                 example: example
 *               nama:
 *                 type: string
 *                 example: example
 *               alamat:
 *                 type: string
 *                 example: example
 *               email:
 *                 type: string
 *                 example: example
 *               password:
 *                 type: string
 *                 example: example
 *               no_telepon:
 *                 type: string
 *                 example: example
 *     responses:
 *       201:
 *         description: Pemilik added successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Pemilik added successfully.
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
router.post('/', pemilikController.createPemilik);

/**
 * @swagger
 * /pemilik/{id_user}:
 *   put:
 *     summary: Edit existing user
 *     tags: [Pemilik]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id_pemilik
 *               - nama
 *               - alamat
 *               - email
 *               - password
 *               - no_telepon
 *             properties:
 *               id_pemilik:
 *                 type: string
 *                 example: example
 *               nama:
 *                 type: string
 *                 example: example
 *               alamat:
 *                 type: string
 *                 example: example
 *               email:
 *                 type: string
 *                 example: example
 *               password:
 *                 type: string
 *                 example: example
 *               no_telepon:
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
 *                   example: User updated succesfully.
 *       404:
 *         description: User not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User not found.
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
router.put('/:id_pemilik', pemilikController.updatePemilik);

/**
 * @swagger
 * /pemilik/{id_pemilik}:
 *   delete:
 *     summary: Delete specific user.
 *     tags: [Pemilik]
 *     parameters:
 *       - in: path
 *         name: id_pemilik
 *         example: example
 *         required: true
 *         description: id_pemilik.
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
 *                 user:
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
router.delete('/:id_pemilik', pemilikController.deletePemilik);

module.exports = router;