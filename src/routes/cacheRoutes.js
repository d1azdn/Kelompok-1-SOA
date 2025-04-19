require('dotenv').config();
const express = require("express")
const router = express.Router();
const { getUserCache, postUserCache, deleteUserCache } = require("../controllers/caches/userCacheController")
const { getCarAvailable, postCarAvailable } = require("../controllers/caches/carAvailCacheController")
const { getRentalCache, postRentalCache } = require("../controllers/caches/rentalCarCacheController")
const { getRentalRatingCache, postRentalRatingCache, deleteRentalRatingCache } = require("../controllers/caches/rentalRatingCacheController")

router.get('/user/session/:id_penyewa', getUserCache)
router.post('/user/session/:id_penyewa' , postUserCache)
router.delete('/user/session/:id_penyewa', deleteUserCache)

router.get('/car/available/:id_mobil' , getCarAvailable)
router.post('/car/available/:id_mobil', postCarAvailable)

router.get('/rental/:id_rental' , getRentalCache)
router.post('/rental/:id_rental', postRentalCache)

router.get('/rental/rating/:id_rental', getRentalRatingCache)
router.post('/rental/rating/:id_rental' , postRentalRatingCache)
router.delete('/rental/rating/:id_rental', deleteRentalRatingCache)


module.exports = router;