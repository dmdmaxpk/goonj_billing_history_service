const express = require('express');
const router = express.Router();
const controller = require('../controllers/messageController');

router.route('/sms')
    .post(controller.postSMS)

// Update on the basis of user msisdn
router.route('/email')
    .post(controller.postEmail)

module.exports = router;
