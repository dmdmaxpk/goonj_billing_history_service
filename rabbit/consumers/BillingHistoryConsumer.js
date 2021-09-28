const BillingHistoryRepository = require('../../repos/BillingHistoryRepository');
const historyRepo = new BillingHistoryRepository();

const RabbitMq = require('../RabbitMq');
const rabbitMq = new RabbitMq().getInstance();

class BillingHistoryConsumer{
    async consume(message){
        let history = JSON.parse(message.content);

        if(history.operator_response && history.operator_response.errorMessage && history.billing_status === 'graced' &&
        (history.operator_response.errorMessage === 'The account balance is insufficient.' || history.operator_response.errorMessage === 'Failed to verify the management state.' || history.operator_response.errorMessage === 'Failed to verify the life cycle state.'))
        {
            let result = await historyRepo.findHistory(history);
            if(result){
                await historyRepo.updateCount(result._id);
            }else{
                await historyRepo.save(history);
            }
        }else{
            await historyRepo.save(history);
        }
        rabbitMq.acknowledge(message);
    }
}

module.exports = BillingHistoryConsumer;