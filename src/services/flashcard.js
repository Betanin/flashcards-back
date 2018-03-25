const { Flashcard } = require('../models');
const { crudOperations } = require('../helpers/services');

module.exports = crudOperations(Flashcard);