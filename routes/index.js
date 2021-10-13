const express = require('express');
const router = express.Router();
const controller = require('../controllers/BillingHistoryController');
const cors = require('cors');
// Service Label
router.get('/', (req, res) => res.send("Goonj Billing History Microservice"));

router.get('/history/count', controller.getHistoryCount);

router.route('/rev', cors())
    .get(controller.rev_report)

router.route('/req-count', cors())
    .get(controller.req_count)

router.route('/revenue/stats', cors())
    .get(controller.revenue_stats);

module.exports = router;