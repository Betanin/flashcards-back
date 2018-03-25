const mongoose = require('mongoose');
const isEmail = require('validator/lib/isEmail');

const { isPassword } = require('./validate');
const { hashPassword } = require('./middleware');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        validate: [{ validator: value => isEmail(value), msg: 'Invalid email.' }],
    },
    password: {
        type: String,
        validate: [{ validator: isPassword, msg: 'Invalid password.' }],
    },
}, { timestamps: true });

userSchema.pre('save', hashPassword);

module.exports = mongoose.model('User', userSchema);