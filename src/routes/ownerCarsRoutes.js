const express = require('express');
const router = express.Router();
const {
    getOwnerCarsWithLastLease,
    getOwnerCarFleetSummary
} = require('../controllers/ownerCarsController');

// Get all cars owned by an owner with their last lease status
router.get('/:id_pemilik/cars-with-last-lease', getOwnerCarsWithLastLease);

// Get owner's car fleet summary with rental statistics
router.get('/:id_pemilik/car-fleet-summary', getOwnerCarFleetSummary);

module.exports = router; 