const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');

const config = require('./config');

const app = express();

// Middlewares
app.use(bodyParser.json({limit: '5120kb'}));  //5MB
app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger('dev'));

const RabbitMq = require('./rabbit/RabbitMq');
const rabbitMq = new RabbitMq().getInstance();

// Import routes
app.use('/', require('./routes/index'));

// Start Server
let { port } = config;
app.listen(port, () => {
    console.log(`Goonj Message Service Running On Port ${port}`);
    rabbitMq.initServer(config.queueNames.messageDispatcher, (error, response) => {
        if(error){
            console.error(error)
        }else{
            console.log('RabbitMq status', response);
        }
    });
});