const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const flashcardSchema = new Schema({

    word: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }

}, { timestamps: true });

mongoose.model('Flashcard', flashcardSchema);

module.exports = mongoose.model('Flashcard');