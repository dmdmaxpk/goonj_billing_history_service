const BillingHistoryRepository = require('../repos/BillingHistoryRepository');
const historyRepo = new BillingHistoryRepository();

exports.getExpiryHistory = async(req, res) => {
    let result = await historyRepo.getExpiryHistory(req.query.user_id)
    res.send(result);
}

