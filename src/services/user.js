const { User } = require('../models');
const { crudOperations } = require('../helpers/services');

module.exports = crudOperations(User);