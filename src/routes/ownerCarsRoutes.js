const express = require('express');
const router = express.Router();
const {
    getOwnerCarsWithLastLease,
    getOwnerCarFleetSummary
} = require('../controllers/ownerCarsController');


/**
 * @swagger
 * /owner-cars/{id_pemilik}/cars-with-last-lease:
 *   get:
 *     summary: Get car car etc.
 *     tags: [Pemilik Mobil]
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
 *         description: Data ditemukan.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 car:
 *                   type: object
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
// Get all cars owned by an owner with their last lease status
router.get('/:id_pemilik/cars-with-last-lease', getOwnerCarsWithLastLease);


/**
 * @swagger
 * /owner-cars/{id_pemilik}/car-fleet-summary:
 *   get:
 *     summary: Get car car etc.
 *     tags: [Pemilik Mobil]
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
 *         description: Data ditemukan.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 car:
 *                   type: object
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
// Get owner's car fleet summary with rental statistics
router.get('/:id_pemilik/car-fleet-summary', getOwnerCarFleetSummary);

module.exports = router; 