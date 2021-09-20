const BillingHistoryRepository = require('../../repos/BillingHistoryRepository');
const historyRepo = new BillingHistoryRepository();

class BillingHistoryConsumer{
    async consume(message){
        let history = JSON.parse(message.content);

        if(history.operator_response && history.operator_response.errorMessage && history.operator_response.errorMessage === 'The account balance is insufficient.'){
            let result = await historyRepo.findHistory(history);
            if(result){
                console.log(`Billing history for user: ${history.user_id} with status ${history.operator_response.errorMessage} already exists for this day.`)
            }
            else{
                await historyRepo.save(history);
            }
        }
        else{
            await historyRepo.save(history);
        }
        rabbitMq.acknowledge(message);
    }
}

module.exports = BillingHistoryConsumer;