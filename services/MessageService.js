const config = require("../config");

addToQueue = async(message, msisdn) => {
    let messageObj = {};
    messageObj.message =  message;
    messageObj.msisdn = msisdn;
    
    console.log('AddedInQueue - MSISDN - ', msisdn, ' - MESSAGE - ', message, ' - ', (new Date()));
    if (messageObj.msisdn && messageObj.message) {
        rabbitMq.addInQueue(config.queueNames.messageDispatcher, messageObj);
    } else {
        console.log('Critical parameters are missing', messageObj.msisdn, messageObj.message);
    }
}

sendDirectly = async(message, msisdn) => {
    
}

module.exports = {
    addToQueue: addToQueue,
    sendDirectly: sendDirectly
};