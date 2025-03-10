const express = require("express")
const { getAllCar } = require("../controllers/mobilController")

const router = express.Router();

router.get("/all", getAllCar);


module.exports = router;
