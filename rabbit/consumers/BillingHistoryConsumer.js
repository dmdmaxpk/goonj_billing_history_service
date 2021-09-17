const BillingHistoryRepository = require('../../repos/BillingHistoryRepository');
const historyRepo = new BillingHistoryRepository();

class BillingHistoryConsumer{
    async consume(message){
        let history = JSON.parse(message.content);
        await historyRepo.save(history);
    }
}

module.exports = BillingHistoryConsumer;