const config = require('../config');
const MessageService = require('../services/MessageService');
const EmailService = require('../services/EmailService');

exports.sendToQueue = async (req, res) => {
	let postData = req.body;
	await MessageService.sendToQueue(postData.message, postData.msisdn);
	res.send({code: config.codes.code_success, message: 'Message Sent To Queue'});
}

exports.sendDirectly = async (req, res) => {
	let postData = req.body;
	await MessageService.sendDirectly(postData.message, postData.msisdn);
	res.send({code: config.codes.code_success, message: 'Message Sent'});
}

exports.postEmail = async (req, res) => {
	let postData = req.body;
	await EmailService.sendEmail(postData.subject,postData.text,postData.email);
	res.send({code: config.codes.code_success, message: 'Email Sent'});
}