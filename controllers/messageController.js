const config = require('../config');
const messageService = require('../services/messageService');
const emailService = require('../services/emailService');

exports.sendToQueue = async (req, res) => {
	let postData = req.body;
	let response = await messageService.sendToQueue(postData.message, postData.msisdn);
	res.send({code: response === true ? config.codes.code_success : config.codes.code_error, message: response === true ? 'Message sent to queue' : 'Failed to push message to queue, please make sure yu are providing valid arguments i.e msisdn & message'});
}

exports.sendDirectly = async (req, res) => {
	let postData = req.body;
	try{
		let response = await messageService.sendDirectly(postData.message, postData.msisdn);
		res.send({code: response.code, message: response.message});
	}catch(e){
		res.send({code: config.codes.code_error, message: 'Failed to send message'});
	}
}

exports.postEmail = async (req, res) => {
	let postData = req.body;
	emailService.sendEmail(postData.subject, postData.text, postData.email);
	res.send({code: config.codes.code_success, message: 'Email sent'});
}