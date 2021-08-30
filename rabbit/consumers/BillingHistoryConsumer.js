const BillingHistoryRepository = require('../../repos/BillingHistoryRepository');
const historyRepo = new BillingHistoryRepository();

const RabbitMq = require('../RabbitMq');
const rabbitMq = new RabbitMq().getInstance();

class BillingHistoryConsumer{
    async consume(message){
        await historyRepo.save(JSON.parse(message.content));
        rabbitMq.acknowledge(message);
    }
}

module.exports = BillingHistoryConsumer;