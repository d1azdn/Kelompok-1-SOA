require('dotenv').config();

const express = require("express")
const router = express.Router();
const { authGoogle, authGoogleCallback } = require("../controllers/authGoogleController")
const { authLogin, authRegister } = require("../controllers/authController")

const rateLimit = require('express-rate-limit');

const loginLimit = rateLimit({
    windowMs: 5 * 60 * 1000,
    max: 5,
    message: 'Terlalu banyak percobaan. Coba lagi dalam 5 menit.',
    standardHeaders: true,
    legacyHeaders: false,
});

const registerLimit = rateLimit({
    windowMs: 10 * 60 * 1000,
    max: 5,
    message: 'Terlalu banyak percobaan. Coba lagi dalam 10 menit.',
    standardHeaders: true,
    legacyHeaders: false,
});

/**
 * @swagger
 * /auth/google:
 *   post:
 *     summary: Login user by google Oauth2
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *     responses:
 *       200:
 *         description: Berhasil login.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: JWT token
 *                 message:
 *                   type: string
 *                   example: Berhasil login.
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
router.get('/api/google', loginLimit, authGoogle)
router.get('/api/google/callback', loginLimit, authGoogleCallback)

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login user by email
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       200:
 *         description: Berhasil login.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: JWT token
 *                 message:
 *                   type: string
 *                   example: Berhasil login.
 *       400:
 *         description: Kesalahan input atau email/password salah.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Email atau password salah.
 */
router.post('/login', loginLimit, authLogin)

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register user using email, password, no_telp etc.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nama
 *               - alamat
 *               - email
 *               - password
 *               - no_telepon
 *             properties:
 *               nama:
 *                 type: string
 *                 example: example
 *               alamat:
 *                 type: string
 *                 example: example
 *               email:
 *                 type: string
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 example: password123
 *               no_telepon:
 *                 type: string
 *                 example: 088877776666
 *     responses:
 *       200:
 *         description: Berhasil registrasi.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: JWT token
 *                 message:
 *                   type: string
 *                   example: Email berhasil terdaftar.
 *       400:
 *         description: Email sudah terdaftar.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Email sudah terdaftar.
 */
router.post('/register', registerLimit, authRegister)


module.exports = router;