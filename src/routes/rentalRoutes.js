const express = require('express');
const router = express.Router();
const rentalController = require('../controllers/rentalController');

router.get('/', rentalController.getAllRental);
router.get('/:id_rental', rentalController.getRentalById);
router.post('/', rentalController.createRental);
router.put('/:id_rental', rentalController.updateRental);
router.delete('/:id_rental', rentalController.deleteRental);

module.exports = router;
