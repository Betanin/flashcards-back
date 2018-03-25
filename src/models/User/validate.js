const validator = require('validator');

function isPassword(value) {
    return validator.isLength(value, { min: 4 });
}

module.exports = {
    isPassword,
};