// Required packages
import express from 'express';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import session from 'client-sessions';

import pagination from './middlewares/pagination';
import templateGlobals from './middlewares/templateGlobals';
import routes from './routes/routes';
import config from './config';

// Init express app
const app = express();

// Specify views folder and view engine
app.set('views', `${__dirname}/views`);
app.set('view engine', 'jade');

// Protect the system with helmet
app.use(helmet());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// Define static routes
app.use('/public', express.static(`${__dirname}/public/`));

// Init sesion system
app.use(session({
  cookieName: 'session',
  secret: config.app.secretWord,
  duration: config.app.sessionDuration,
  activeDuration: config.app.sessionDuration,
}));

// Middlewares
app.use(templateGlobals);
app.use(pagination);

// Register routes
app.use('/', routes);

module.exports = app;
