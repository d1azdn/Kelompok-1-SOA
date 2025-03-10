const express = require("express")
const { getAllRental } = require("../controllers/rentalController")

const router = express.Router();

router.get("/all", getAllRental);


module.exports = router;
