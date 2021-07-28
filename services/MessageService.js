const config = require("../config");

sendMessage = async(message, msisdn) => {
    let messageObj = {};
    messageObj.message =  message;
    messageObj.msisdn = msisdn;
    
    // Add object in queueing server
    console.log('AddedInQueue - MSISDN - ', msisdn, ' - MESSAGE - ', message, ' - ', (new Date()));
    if (messageObj.msisdn && messageObj.message) {
        rabbitMq.addInQueue(config.queueNames.messageDispatcher, messageObj);
    } else {
        console.log('Critical parameters missing',messageObj.msisdn,messageObj.message);
    }
}

module.exports = {
    sendMessage: sendMessage
};