const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const fileupload = require('express-fileupload');


const config = require('./config');
const swStats = require('swagger-stats');

var RabbitMq = require('./repos/queue/RabbitMq');

const app = express();

function skipLog (req, res) {
    var url = req.originalUrl;
    if(url.includes('cron') || url.includes('swagger-stats')){
      return true;
    }
    return false;
}

app.use(logger('combined', {skip: skipLog}));
//app.use(logger('dev'));

app.use(swStats.getMiddleware({}));

// Middlewares
app.use(fileupload());
app.use(bodyParser.json({limit: '5120kb'}));  //5MB
app.use(bodyParser.urlencoded({ extended: false }));

// Import routes
app.use('/', require('./routes/index'));

// Start Server
let { port } = config;
app.listen(port, () => {
    console.log(`APP running on port ${port}`);
});