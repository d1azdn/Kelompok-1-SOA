const express = require("express")
const { getAllReturn } = require("../controllers/returnController")

const router = express.Router();

router.get("/all", getAllReturn);


module.exports = router;
