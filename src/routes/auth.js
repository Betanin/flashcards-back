const { handler } = require('../helpers/controllers');
const { auth } = require('../controllers');

module.exports = (app) => {

    app.route('/v1/login')
        .post(handler(auth.login, (req, res, next) => [req, res, next]));

    app.route('/v1/signup')
        .post(handler(auth.signup, (req, res, next) => [req, res, next]));

};