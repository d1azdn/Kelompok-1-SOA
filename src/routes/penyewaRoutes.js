const express = require("express")
const { getAllPenyewa } = require("../controllers/penyewaController")

const router = express.Router();

router.get("/all", getAllPenyewa);


module.exports = router;
