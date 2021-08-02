const express = require('express');
const router = express.Router();
const controller = require('../controllers/messageController');

router.route('/send-to-queue').post(controller.sendToQueue)
router.route('/send-directly').post(controller.sendDirectly)
router.route('/email').post(controller.postEmail)

module.exports = router;
