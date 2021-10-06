const BillingHistoryRepository = require('../repos/BillingHistoryRepository');
let historyRepo = new BillingHistoryRepository();

exports.getHistoryCount = async (req,res) =>  {
    let startDate = req.query.startDate;
    let endDate = req.query.endDate;

    let count = await historyRepo.getHistoryCount(startDate, endDate);
    console.log(new Date(startDate), new Date(endDate), "count", count)
    res.send({count})
}