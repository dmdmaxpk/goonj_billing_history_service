const config = require("../config");
const axios = require('axios');

const RabbitMq = require('../rabbit/RabbitMq');
const rabbitMq = new RabbitMq().getInstance();

sendToQueue = async(message, msisdn) => {
    let messageObj = {};
    messageObj.message =  message;
    messageObj.msisdn = msisdn;
    
    console.log('Pushing message to queue', '-', msisdn, '-', message, '-', (new Date()));
    if (messageObj.msisdn && messageObj.message) {
        rabbitMq.addInQueue(config.queueNames.messageDispatcher, messageObj);
        return true;
    } else {
        return false;
    }
}

sendDirectly = async(message, msisdn) => {
    return new Promise(function(resolve, reject) {
        axios({
            method: 'post',
            url: config.tp_ep_core_service + 'send-sms',
            headers: {'Content-Type': 'application/json' },
            data: {msisdn: msisdn, message: message}
        }).then(function(response){
            resolve(response.data);
        }).catch(function(err){
            reject(err);
        });
    });
}

module.exports = {
    sendToQueue: sendToQueue,
    sendDirectly: sendDirectly
};