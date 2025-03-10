const express = require("express")
const { getAllUlasan } = require("../controllers/ulasanController")

const router = express.Router();

router.get("/all", getAllUlasan);


module.exports = router;
