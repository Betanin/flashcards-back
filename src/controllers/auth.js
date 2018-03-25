const passport = require('passport');
const { ServerError } = require('../helpers/server');

function login(req, res, next) {

    return new Promise((resolve, reject) => {

        passport.authenticate('local-login', (error, token, userData) => {

            if (error)
                return reject(error);

            return res.json({
                success: true,
                message: 'You have successfully logged in!',
                token,
                user: userData
            });

        })(req, res, next);
    });
}

function signup(req, res, next) {
    return new Promise((resolve, reject) => {
        passport.authenticate('local-signup', (error, user, info) => {
            if (error)
                return reject(error);
            if (!user)
                return reject(new ServerError(info, 400));
            return resolve(user);
        })(req, res, next);
    });
}

module.exports = {
    login,
    signup,
};