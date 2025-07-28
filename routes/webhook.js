const express = require('express');
const router = express.Router();
const webhookController = require('../controllers/webhookController');

router.post('/deposit', webhookController.handleDeposit);

module.exports = router;
