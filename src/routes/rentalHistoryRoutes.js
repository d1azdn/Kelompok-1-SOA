const express = require('express');
const router = express.Router();
const { getRentalHistory, getRentalHistoryByTenant } = require('../controllers/rentalHistoryController');

/**
 * @swagger
 * /rental-history/:
 *   get:
 *     summary: Get all rental history.
 *     tags: [Rental History]
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
// Get all rental history
router.get('/', getRentalHistory);


/**
 * @swagger
 * /rental-history/tenant/{id_rental}:
 *   get:
 *     summary: Get specific tenant detail.
 *     tags: [Rental History]
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
// Get rental history for a specific tenant
router.get('/tenant/:penyewa_id', getRentalHistoryByTenant);

module.exports = router; 