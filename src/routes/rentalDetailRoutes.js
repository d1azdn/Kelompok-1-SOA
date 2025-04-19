const express = require('express');
const router = express.Router();
const {
    getDetailedRentalInfo,
    getDetailedRentalById
} = require('../controllers/rentalDetailController');

/**
 * @swagger
 * /rental-detail/:
 *   get:
 *     summary: Get all rental detail.
 *     tags: [Rental Detail]
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
// Get all detailed rental information
router.get('/', getDetailedRentalInfo);

/**
 * @swagger
 * /rental-detail/{id_rental}:
 *   get:
 *     summary: Get specific rental detail.
 *     tags: [Rental Detail]
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
// Get detailed rental information by ID
router.get('/:id_rental', getDetailedRentalById);

module.exports = router; 