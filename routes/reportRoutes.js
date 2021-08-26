const express = require('express');
const router = express.Router();
const controller = require('../controllers/BillingHistoryController');

router.route('/rev')
    .get(controller.rev_report)

router.route('/req-count')
    .get(controller.req_count)

router.route('/revenue/stats')
    .get(controller.revenue_stats);

module.exports = router;