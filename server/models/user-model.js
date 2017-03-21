/* globals module require String */
'use strict';
const mongoose = require('mongoose');
const requiredMessage = '{PATH} is required!';
//const encryption = require('../utilities/encryption');

let userSchema = mongoose.Schema({
    username: {
        type: String,
        required: requiredMessage,
        unique: true,
        minlength: 4,
        maxlength: 30
    },
    // salt: String,
    // hashPass: String,
    password: {
        type: String,
        require: requiredMessage,
        minlength: 6,
        maxlength: 50
    },
    email: {
        type: String,
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
        require: requiredMessage
    },
    avatar: {
        type: String,
        default: 'http://www.subdimension.co.uk/style/assets/avatar.png'
    }
});

// userSchema.method({
//     authenticate: function(password) {
//         if (encryption.generateHashedPassword(this.salt, password) === this.hashPass) {
//             return true;
//         } else {
//             return false;
//         }
//     }
// });

mongoose.model('User', userSchema);
module.exports = mongoose.model('User');