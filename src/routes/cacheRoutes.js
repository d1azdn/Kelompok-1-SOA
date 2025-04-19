require('dotenv').config();
const express = require("express")
const router = express.Router();
const { getUserCache, postUserCache, deleteUserCache } = require("../controllers/caches/userCacheController")
const { getCarAvailable, postCarAvailable } = require("../controllers/caches/carAvailCacheController")
const { getRentalCache, postRentalCache } = require("../controllers/caches/rentalCarCacheController")
const { getRentalRatingCache, postRentalRatingCache, deleteRentalRatingCache } = require("../controllers/caches/rentalRatingCacheController")

/**
 * @swagger
 * /cache/user/session/{id_penyewa}:
 *   get:
 *     summary: Get session for user
 *     tags: [Cache]
 *     parameters:
 *       - in: path
 *         name: id_penyewa
 *         example: example
 *         required: true
 *         description: ID penyewa.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Session ditemukan.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 session:
 *                   type: object
 *                   description: User cache
 *       404:
 *         description: Session tidak ditemukan.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Session tidak ditemukan.
 */
router.get('/user/session/:id_penyewa', getUserCache)

/**
 * @swagger
 * /cache/user/session/{id_penyewa}:
 *   post:
 *     summary: POST session for user
 *     tags: [Cache]
 *     parameters:
 *       - in: path
 *         name: id_penyewa
 *         example: example
 *         required: true
 *         description: ID penyewa.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id_penyewa
 *               - nama
 *               - alamat
 *               - email
 *               - no_telepon
 *             properties:
 *               id_penyewa:
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
 *                 example: user@example.com
 *               no_telepon:
 *                 type: string
 *                 example: 088877776666
 *     responses:
 *       200:
 *         description: Berhasil caching user.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Berhasil caching user.
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
router.post('/user/session/:id_penyewa' , postUserCache)

/**
 * @swagger
 * /cache/user/session/{id_penyewa}:
 *   delete:
 *     summary: Delete session for user
 *     tags: [Cache]
 *     parameters:
 *       - in: path
 *         name: id_penyewa
 *         example: example
 *         required: true
 *         description: ID penyewa.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Session ditemukan.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 session:
 *                   type: object
 *                   description: User cache
 *       404:
 *         description: Session tidak ditemukan.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Session tidak ditemukan.
 */
router.delete('/user/session/:id_penyewa', deleteUserCache)


/**
 * @swagger
 * /cache/car/available/{id_mobil}:
 *   get:
 *     summary: Get session for car available status
 *     tags: [Cache]
 *     parameters:
 *       - in: path
 *         name: id_mobil
 *         example: example
 *         required: true
 *         description: ID mobil.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Session ditemukan.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 session:
 *                   type: object
 *                   description: User cache
 *       404:
 *         description: Session tidak ditemukan.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Session tidak ditemukan.
 */
router.get('/car/available/:id_mobil' , getCarAvailable)

/**
 * @swagger
 * /cache/car/available/{id_mobil}:
 *   post:
 *     summary: POST session for car available status
 *     tags: [Cache]
 *     parameters:
 *       - in: path
 *         name: id_mobil
 *         example: example
 *         required: true
 *         description: ID mobil.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - available
 *             properties:
 *               available:
 *                 type: string
 *                 example: "true"
 *     responses:
 *       200:
 *         description: Berhasil caching mobil.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Berhasil caching mobil.
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
router.post('/car/available/:id_mobil', postCarAvailable)


/**
 * @swagger
 * /cache/rental/{id_rental}:
 *   get:
 *     summary: Get session for rental information
 *     tags: [Cache]
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
 *         description: Session ditemukan.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 session:
 *                   type: object
 *                   description: User cache
 *       404:
 *         description: Session tidak ditemukan.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Session tidak ditemukan.
 */
router.get('/rental/:id_rental' , getRentalCache)

/**
 * @swagger
 * /cache/rental/{id_rental}:
 *   post:
 *     summary: POST session for rental information
 *     tags: [Cache]
 *     parameters:
 *       - in: path
 *         name: id_rental
 *         example: example
 *         required: true
 *         description: ID rental.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id_penyewa
 *               - id_mobil
 *               - status_pembayaran
 *               - tanggal_selesai
 *               - tanggal_mulai
 *             properties:
 *               id_penyewa:
 *                 type: string
 *                 example: example
 *               id_mobil:
 *                 type: string
 *                 example: example
 *               status_pembayaran:
 *                 type: string
 *                 example: example
 *               tanggal_selesai:
 *                 type: string
 *                 example: "12-2-2024"
 *               tanggal_mulai:
 *                 type: string
 *                 example: "12-3-2024"
 *     responses:
 *       200:
 *         description: Berhasil caching mobil.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Berhasil caching user.
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
router.post('/rental/:id_rental', postRentalCache)


/**
 * @swagger
 * /cache/rental/rating/{id_rental}:
 *   get:
 *     summary: Get session for rental rating information
 *     tags: [Cache]
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
 *         description: Session ditemukan.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 session:
 *                   type: object
 *                   description: User cache
 *       404:
 *         description: Session tidak ditemukan.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Session tidak ditemukan.
 */
router.get('/rental/rating/:id_rental', getRentalRatingCache)

/**
 * @swagger
 * /cache/rental/rating/{id_rental}:
 *   post:
 *     summary: POST session for rental information
 *     tags: [Cache]
 *     parameters:
 *       - in: path
 *         name: id_rental
 *         example: example
 *         required: true
 *         description: ID rental.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id_ulasan
 *               - tanggal
 *               - rating
 *               - ulasan
 *             properties:
 *               id_ulasan:
 *                 type: string
 *                 example: example
 *               tanggal:
 *                 type: string
 *                 example: "12-2-2024"
 *               rating:
 *                 type: string
 *                 example: example
 *               ulasan:
 *                 type: string
 *                 example: "12-2-2024"
 *     responses:
 *       200:
 *         description: Berhasil caching rental rating.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Berhasil caching rental rating.
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
router.post('/rental/rating/:id_rental' , postRentalRatingCache)

/**
 * @swagger
 * /cache/rental/rating/{id_rental}:
 *   delete:
 *     summary: Delete session for rental rating
 *     tags: [Cache]
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
 *         description: Session berhasil dihapus.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Session berhasil dihapus.
 *       404:
 *         description: Session tidak ditemukan.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Session tidak ditemukan.
 */
router.delete('/rental/rating/:id_rental', deleteRentalRatingCache)


module.exports = router;