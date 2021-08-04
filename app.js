const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');

const config = require('./config');

const app = express();

// Middlewares
app.use(bodyParser.json({limit: '5120kb'}));  //5MB
app.use(bodyParser.urlencoded({ extended: false }));

// Import routes
app.use('/', require('./routes/index'));

// Start Server
let { port } = config;
app.listen(port, () => {
    console.log(`Goonj Message Service running on port ${port}`);
});