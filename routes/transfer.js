const express = require('express');
const router = express.Router();
const { sendMoney } = require('../controllers/transferController');

router.post('/', sendMoney);

module.exports = router;
