const { handler } = require('../helpers/controllers');
const { flashcard } = require('../controllers');

module.exports = (app) => {

    app.route('/v1/flashcard')
        .get(handler(flashcard.findAll, (req, res, next) => [req.user]))
        .post(handler(flashcard.create, (req, res, next) => [req.user, req.body]));

    app.route('/v1/flashcard/:id')
        .get(handler(flashcard.find, (req, res, next) => [req.user, req.params.id]))
        .delete(handler(flashcard.remove, (req, res, next) => [req.user, req.params.id]))
        .put(handler(flashcard.update, (req, res, next) => [req.user, req.params.id, req.body]));

    app.route('/v1/flashcard/raffle/:amount')
        .get(handler(flashcard.raffle, (req, res, next) => {
            console.log(req.headers);
            
            return [req.user, req.params.amount]
        }));

};