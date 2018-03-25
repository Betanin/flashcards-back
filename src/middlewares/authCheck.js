const jwt = require('jsonwebtoken');
const userService = require('../services').user;

module.exports = (jwtSecret) => (req, res, next) => {

    console.log(req.method);
    
    if (req.method === 'OPTIONS')
        return next();

    if (!req.headers.authorization)
        return res.status(401).end();

    const token = req.headers.authorization.split(' ')[1];

    const result = jwt.verify(token, jwtSecret, async (err, decoded) => {

        if (err)
            return res.status(401).end();

        const userId = decoded.sub;
        const user = await userService.findById(userId);

        if (!user || !user._id)
            return res.status(401).end();

        return next();
    });

    return result;

};