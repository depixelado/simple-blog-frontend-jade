// Required packages
const express = require('express');
const helmet = require('helmet');
const routes = require('./routes/routes');
const pagination = require('./middlewares/pagination');

// App config vars
var config = require('./config');

// Init express app
var app = express();

// Specify views folder and view engine
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

// Protect the system with helmet
app.use(helmet());

// Define static routes
app.use('/public', express.static(__dirname + '/public/'));

// Middlewares
app.use(pagination);

// Register routes
app.use('/', routes);

module.exports = app;