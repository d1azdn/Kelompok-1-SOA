const express = require('express');
const router = express.Router();
const {
    getDetailedRentalInfo,
    getDetailedRentalById
} = require('../controllers/rentalDetailController');

// Get all detailed rental information
router.get('/', getDetailedRentalInfo);

// Get detailed rental information by ID
router.get('/:id_rental', getDetailedRentalById);

module.exports = router; 