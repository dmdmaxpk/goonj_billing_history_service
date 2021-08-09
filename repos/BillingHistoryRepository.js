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

    async getExpiryHistory(user_id) {
        let result = await BillingHistory.aggregate([{             
            $match:{ 
                "user_id": user_id,
                $or:[
                    {"billing_status" : "expired"}, 
                    {"billing_status" : "unsubscribe-request-recieved"}, 
                    {"billing_status" : "unsubscribe-request-received-and-expired"}
                ]
            }      
        }]);
        console.log("expired history", result);
        return result;
    }

    setDateWithTimezone(date){
        return new Date(date.toLocaleString("en-US", {timeZone: "Asia/Karachi"}));
    }
}

module.exports = BillingHistoryRepository;