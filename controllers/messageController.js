const config = require('../config');
const MessageService = require('../services/MessageService');
const EmailService = require('../services/EmailService');

// CREATE
exports.postSMS = async (req, res) => {
	let postData = req.body;
	await MessageService.sendMessage(postData.message, postData.msisdn);
	res.send({code: config.codes.code_success, message: 'Message Sent'});
}

exports.postEmail = async (req, res) => {
	let postData = req.body;
	await EmailService.sendEmail(postData.subject,postData.text,postData.email);
	res.send({code: config.codes.code_success, message: 'Email Sent'});
}