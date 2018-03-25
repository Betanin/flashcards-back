const { ServerError } = require('./server');

const handler = (promise, params) => async (req, res, next) => {
    
    const boundParams = params ? params(req, res, next) : [];

    try {
        const result = await promise(...boundParams);
        return res.json(result || { message: 'OK' });
    } catch (error) {
        return res.status(error.status || 500).json({ error: error.message });
    }

};

module.exports = {
    handler
};