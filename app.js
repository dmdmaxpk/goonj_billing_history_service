const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');

const config = require('./config');
const app = express();

const mongoose = require('mongoose');

// Import database models
require('./models/BillingHistory');
require('./models/Subscription');
require('./models/User');
require('./models/ViewLog');

// Connection to Database
mongoose.connect(config.mongo_connection_url, {useUnifiedTopology: true, useCreateIndex: true, useNewUrlParser: true});
mongoose.connection.on('error', err => console.error(`Error: ${err.message}`));

// Middlewares
app.use(bodyParser.json({limit: '5120kb'}));  //5MB
app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger('dev'));
app.use(cors());

const RabbitMq = require('./rabbit/RabbitMq');
const rabbitMq = new RabbitMq().getInstance();

// Import routes
app.use('/', require('./routes/index'));

const BillingHistoryConsumer = require('./rabbit/consumers/BillingHistoryConsumer');
const billingHistoryConsumer = new BillingHistoryConsumer();

const SyncCollectionConsumer = require('./rabbit/consumers/SyncCollectionConsumer');
const syncCollectionConsumer = new SyncCollectionConsumer();

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
                rabbitMq.createQueue(config.queueNames.syncCollectionDispatcher);
                rabbitMq.consumeQueue(config.queueNames.billingHistoryDispatcher, (message) => {
                    billingHistoryConsumer.consume(message)
                });

                rabbitMq.consumeQueue(config.queueNames.syncCollectionDispatcher, (message) => {
                    syncCollectionConsumer.consume(message);
                    rabbitMq.acknowledge(message);
                });

            }catch(error){
                console.error(error.message);
            }
        }
    });
});