const passport = require('passport');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const PassportLocalStrategy = require('passport-local').Strategy;
const { ServerError } = require('../helpers/server');
const userService = require('../services').user;

const localLoginStrategy = (jwtSecret) => new PassportLocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    session: false,
    passReqToCallback: true
}, async (req, email, password, done) => {

    const user = await userService.findOne({ email: email.trim() });

    if (!user || !user._id)
        return done(new ServerError('E-mail not found.', 403), undefined, undefined);
    
    const passwordMatch = await comparePassword(password.trim(), user.password);
    if (!passwordMatch)
        return done(new ServerError('Incorrect password.', 403), undefined, undefined);
    
    const payload = {
        sub: user._id,
        data: {
            name: user.name,
            email: user.email
        }
    };

    const token = jwt.sign(payload, jwtSecret);
    const data = {
        name: user.name || user.email
    };

    return done(null, token, data);
});

const localSignupStrategy = new PassportLocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    session: false,
    passReqToCallback: true
}, async (req, email, password, done) => {

    const user = await userService.findOne({ email });

    if (user && user._id)
        return done(null, false, 'There is already an account using this email address.');

    if (!email || email.trim() === '')
        return done(new ServerError('E-mail not informed.', 406), undefined, undefined);

    if (!password || password.trim() === '')
        return done(new ServerError('Password not informed.', 406), undefined, undefined);
        
    if (!req.body.name || req.body.name.trim() === '')
        return done(new ServerError('Name not informed.', 406), undefined, undefined);
        
    const userData = {
        email: email.trim(),
        password: password.trim(),
        name: req.body.name.trim()
    };

    try {
        const newUserSaved = await userService.create(userData);
        return done(null, newUserSaved);
    } catch (error) {
        return done(error);
    }

});

const comparePassword = (candidatePassword, userPassword) => {
    return new Promise((resolve, reject) => {
        bcrypt.compare(candidatePassword, userPassword, (error, isMatch) => (
            error ? reject(error) : resolve(isMatch)
        ));
    });
}

function configPassport(app, jwtSecret, protectedContexts, authCheckMiddleware) {

    if (app) {
        app.use(passport.initialize());
        passport.use('local-signup', localSignupStrategy);
        passport.use('local-login', localLoginStrategy(jwtSecret));
        
        if (protectedContexts && authCheckMiddleware) {
            protectedContexts.forEach(element => {
                app.use(element, authCheckMiddleware(jwtSecret));
            });
        }
    }

}

module.exports = configPassport;