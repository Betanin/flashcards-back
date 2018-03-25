const { flashcard } = require('../services');
const { raffleElements } = require('../helpers/raffle');

async function raffle(user, amount){

    return flashcard.findAll()
        .then(flashcards =>
            flashcards = raffleElements(flashcards, amount)
        );

};

async function findAll(user){

    return flashcard.findAll();

};

async function find(user, id){

    return flashcard.findById(id)
        .then(flashcardFound => {
            if (!flashcardFound)
                throw new Error('Flashcard not found!');
        });

};

async function remove(user, id){

    return flashcard.remove({ '_id': id });

};

async function create(user, body){

    return flashcard.create(body);

};

async function update(user, id, body){
    
    return flashcard.update(id, body);

};

module.exports = {
    raffle,
    findAll,
    find,
    remove,
    create,
    update,
};