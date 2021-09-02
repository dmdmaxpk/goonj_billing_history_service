const BillingHistoryRepository = require('../../repos/BillingHistoryRepository');
const historyRepo = new BillingHistoryRepository();

const RabbitMq = require('../RabbitMq');
const rabbitMq = new RabbitMq().getInstance();

class BillingHistoryConsumer{
    async consume(message){
        let history = JSON.parse(message.content);
        await historyRepo.save(history);
        rabbitMq.acknowledge(message);
    }
}

module.exports = BillingHistoryConsumer;