const express = require('express');
const router = express.Router();
const controller = require('../controllers/BillingHistoryController');

// Service Label
router.get('/', (req, res) => res.send("Goonj Billing History Microservice"));

router.get('/history/count', controller.getHistoryCount);

module.exports = router;