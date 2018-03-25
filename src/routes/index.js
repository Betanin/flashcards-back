const { ServerError } = require('../helpers/server');

const errorHandler = (err, req, res, _next) => {
        if (Object.prototype.isPrototypeOf.call(ServerError.prototype, err))
            return res.status(err.status || 500).json({ error: err.message });

        return res.status(500).json({ error: 'Unexpected Error' });
    };

const routes = () => {

    const router = require('express').Router();

    require('./auth')(router);
    require('./flashcard')(router);

    router.use(errorHandler);

    return router;
}

module.exports = routes();