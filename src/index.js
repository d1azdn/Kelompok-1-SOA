const express = require("express")
const mobilRoutes = require("./routes/mobilRoutes")
const pemilikRoutes = require("./routes/pemilikRoutes")
const penyewaRoutes = require("./routes/penyewaRoutes")
const rentalRoutes = require("./routes/rentalRoutes")
const returnRoutes = require("./routes/returnRoutes")
const ulasanRoutes = require("./routes/ulasanRoutes")
const authRoutes = require("./routes/authRoutes")
const cacheRoutes = require("./routes/cacheRoutes")

const router = express.Router()

router.use("/mobil", mobilRoutes)
router.use("/pemilik", pemilikRoutes)
router.use("/penyewa", penyewaRoutes)
router.use("/rental", rentalRoutes)
router.use("/return", returnRoutes)
router.use("/ulasan", ulasanRoutes)
router.use("/auth", authRoutes)
router.use("/cache", cacheRoutes)

module.exports = router;
