const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');

const config = require('./config');
const app = express();

const mongoose = require('mongoose');

// Import database models
require('./models/BillingHistory');

// Connection to Database
mongoose.connect(config.mongo_connection_url, {useUnifiedTopology: true, useCreateIndex: true, useNewUrlParser: true});
mongoose.connection.on('error', err => console.error(`Error: ${err.message}`));

// Middlewares
app.use(bodyParser.json({limit: '5120kb'}));  //5MB
app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger('dev'));
app.use(cors());

// Import routes
// app.use('/', require('./routes/index'));

const RabbitMq = require('./rabbit/RabbitMq');
const rabbitMq = new RabbitMq().getInstance();


const BillingHistoryConsumer = require('./rabbit/consumers/BillingHistoryConsumer');
const billingHistoryConsumer = new BillingHistoryConsumer();

const BillingHistoryRepository = require('./repos/BillingHistoryRepository');
const historyRepo = new BillingHistoryRepository();


// Start Server
let { port } = config;
app.listen(port, () => {
    console.log(`Goonj Billing History Service Running On Port ${port}`);

    rabbitMq.initServer((error, response) => {
        if(error){
            console.error(error)
        }else{
            console.log('RabbitMq status', response);
            try{
                rabbitMq.createQueue(config.queueNames.billingHistoryDispatcher);
                rabbitMq.consumeQueue(config.queueNames.billingHistoryDispatcher, (message) => {
                    billingHistoryConsumer.consume(message);
                });

            }catch(error){
                console.error(error.message);
            }
        }
    });
});