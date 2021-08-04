const mongoose = require('mongoose');
const BillingHistory = mongoose.model('BillingHistory');

class BillingHistoryRepository {

    async save(postData)  {
        let localDate = this.setDateWithTimezone(new Date());

        let billingHistory = new BillingHistory(postData);
        billingHistory.billing_dtm = localDate;

        let result = await billingHistory.save();
        console.log('Record saved in db', result);
        return result;
    }

    setDateWithTimezone(date){
        return new Date(date.toLocaleString("en-US", {timeZone: "Asia/Karachi"}));
    }
}

module.exports = BillingHistoryRepository;