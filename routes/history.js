const express = require('express');
const router = express.Router();
const historyController = require('../controllers/historyController');

router.get('/transactions', historyController.getAllTransactions);
router.get('/deposits', historyController.getAllDeposits);
router.get('/transfers', historyController.getAllTransfers);

module.exports = router;
