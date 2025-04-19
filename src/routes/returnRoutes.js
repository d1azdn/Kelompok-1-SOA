const express = require('express');
const router = express.Router();
const returnController = require('../controllers/returnController');

router.get('/', returnController.getAllReturn);
router.get('/:id_pengembalian', returnController.getReturnById);
router.post('/', returnController.createReturn);
router.put('/:id_pengembalian', returnController.updateReturn);
router.delete('/:id_pengembalian', returnController.deleteReturn);

module.exports = router;
