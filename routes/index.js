const express = require('express');
const router = express.Router();

// Service Label
router.get('/', (req, res) => res.send("Goonj Message Service"));

router.use('/message',    require('./messageRoutes'));

module.exports = router;