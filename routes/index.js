const express = require('express');
const router = express.Router();

// Service Label
router.get('/', (req, res) => res.send("Goonj Billing History Service"));

router.use('/history',    require('./historyRoutes'));

module.exports = router;