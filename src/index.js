const express = require("express");
const carRoutes = require("./routes/carRoutes");

const router = express.Router();

router.use("/car", carRoutes);


module.exports = router;
