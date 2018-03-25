const database = require('./modules/database');
const passport = require('./modules/passport');
const logger = require('./modules/logger');
const express = require('./modules/express');
const authCheckMiddleware = require('./middlewares/authCheck');
const routes = require('./routes');

const startServer = (config) => {

    // Application Modules
    const app = express(config.app.port);
    logger(app, config.log.dir);
    database(config.database.uri);
    passport(app, config.jwt.password, ['/v1/flashcard'], authCheckMiddleware);

    // Routes
    app.use('/', routes);

}

module.exports = startServer;