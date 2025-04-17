require('dotenv').config();

const express = require("express")
const router = express.Router();
const { authGoogle, authGoogleCallback } = require("../controllers/authController")


router.get('/google', authGoogle)
router.get('/google/callback', authGoogleCallback)


module.exports = router;