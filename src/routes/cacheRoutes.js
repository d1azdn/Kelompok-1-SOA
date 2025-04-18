require('dotenv').config();
const express = require("express")
const router = express.Router();
const { getUserCache, postUserCache, deleteUserCache } = require("../controllers/cacheController")


router.get('/user/session/:userId', getUserCache)
router.post('/user/session/:userId' , postUserCache)
router.delete('/user/session/:userId', deleteUserCache)


module.exports = router;