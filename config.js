const env = process.env.NODE_ENV || 'development';


const codes = {
    code_error: -1,
    code_success: 0,
    code_record_added: 1,
    code_record_updated: 2,
    code_record_deleted: 3,

    code_invalid_data_provided: 4,
    code_record_already_added: 5,
    code_data_not_found: 6,

    code_otp_validated: 7,
    code_otp_not_validated: 8,
    code_already_subscribed: 9,
    code_in_billing_queue: 10,
    code_trial_activated: 11,
    code_user_gralisted: 12,
    code_user_blacklisted: 13,
    code_auth_failed: 14,
    code_auth_token_not_supplied: 15,
    code_already_in_queue: 16,
    code_otp_not_found: 17
}

const queueNames = {
    // producers
    messageDispatcher: 'messageDispatcher',
}


let config = {
    development: {
        port: '3000',
        rabbitMq: 'amqp://127.0.0.1',
        queueNames: queueNames,
        codes: codes,
        logger_url: "http://127.0.0.1:8000/",
        secret: "MVPUBRY2IV",
        emailhost:"mail.dmdmax.com.pk",
        emailUsername: "reports@goonj.pk",
        emailPassword: "YiVmeCPtzJn39Mu",
        emailPort: 465,
        emailSecure: true,
    },
    staging: {
        telenor_subscriber_query_api_tps: telenor_subscriber_query_api_tps,
        port: '5000',
        mongoDB: 'mongodb://mongodb:27017/goonjpaywall',
        rabbitMq: 'amqp://rabbitmq',
        queueNames: queueNames,
        codes: codes,
        logger_url: "http://127.0.0.1:8000/",
        secret: "MVPUBRY2IV",
        emailhost:"mail.dmdmax.com.pk",
        emailUsername: "reports@goonj.pk",
        emailPassword: "YiVmeCPtzJn39Mu",
        emailPort: 465,
        emailSecure: true,
    },
    production: {
        telenor_subscriber_query_api_tps: telenor_subscriber_query_api_tps,
        port: process.env.PW_PORT,
        mongoDB: process.env.PW_MONGO_DB_URL,
        rabbitMq: process.env.PW_RABBIT_MQ,
        queueNames: queueNames,
        codes: codes,
        logger_url: "http://127.0.0.1:8000/",
        secret: "MVPUBRY2IV",
        emailhost:"mail.dmdmax.com.pk",
        emailUsername: "reports@goonj.pk",
        emailPassword: "YiVmeCPtzJn39Mu",
        emailPort: 465,
        emailSecure: true,
    }
};

console.log("---", env);

if (env === 'development') config = config.development;
if (env === 'staging') config = config.staging;
if (env === 'production') config = config.production;

module.exports = config;
