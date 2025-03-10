const express = require("express")
const { getAllPemilik } = require("../controllers/pemilikController")

const router = express.Router();

router.get("/all", getAllPemilik);


module.exports = router;
