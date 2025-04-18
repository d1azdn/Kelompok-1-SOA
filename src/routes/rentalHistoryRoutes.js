const express = require('express');
const router = express.Router();
const { getRentalHistory, getRentalHistoryByTenant } = require('../controllers/rentalHistoryController');

// Get all rental history
router.get('/', getRentalHistory);

// Get rental history for a specific tenant
router.get('/tenant/:penyewa_id', getRentalHistoryByTenant);

module.exports = router; 