require('dotenv').config();
const express = require("express")
const router = express.Router();
const { getUserCache, postUserCache, deleteUserCache } = require("../controllers/userCacheController")
const { getCarAvailable, postCarAvailable } = require("../controllers/carAvailCacheController")

router.get('/user/session/:id_penyewa', getUserCache)
router.post('/user/session/:id_penyewa' , postUserCache)
router.delete('/user/session/:id_penyewa', deleteUserCache)

router.get('/car/available/:id_mobil' , getCarAvailable)
router.post('/car/available/:id_mobil', postCarAvailable)


module.exports = router;