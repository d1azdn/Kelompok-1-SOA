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

router.get('/google', loginLimit, authGoogle)
router.get('/google/callback', loginLimit, authGoogleCallback)
router.post('/login', loginLimit, authLogin)
router.post('/register', registerLimit, authRegister)


module.exports = router;