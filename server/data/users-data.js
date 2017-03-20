/*globals Promise */
'use strict';
const encryption = require('../utilities/encryption');

module.exports = function(User) {
    function create(options) {
        const salt = encryption.generateSalt();
        const hashPass = encryption.generateHashedPassword(salt, options.password);

        let user = new User({
            username: options.username,
            password: options.password,
            email: options.email,
            avatar: options.avatar,
        });

        return new Promise((resolve, reject) => {
            user.save((err) => {
                if (err) {
                    return reject(err);
                }
                
                return resolve(user);
            })
        })
    }

    function getById(id) {
        return new Promise((resolve, reject) => {
            User.findOne({ _id: id }, (err, user) => {
                if (err) {
                    return reject(err);
                }
                return resolve(user);
            });
        })
    }

    function all() {
        return new Promise((resolve, reject) => {
            User.find((err, users) => {
                if (err) {
                    return reject(err);
                }

                return resolve(users);
            })
        })
    }

    return {
        create,
        getById,
        all
    }

}