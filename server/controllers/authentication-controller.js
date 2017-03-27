"use strict";
let passport = require("passport");

module.exports = function(data) {
    return {
        register(req, res) {
            let user = {
                username: req.body.username,
                password: req.body.password,
                // salt: req.body.salt,
                // hashPass: req.body.hashPass,
                email: req.body.email,
                avatar: req.body.avatar
            };
            data.userData.create(user)
                .then(resUser => {
                    res.status(201).json({ resUser });
                }).catch((err) => res.status(500).json(err));
        },
        login(req, res, next) {
            const auth = passport.authenticate("local", (err, user) => {
                if (err) {
                    next(err);
                    return;
                }
                if (!user) {
                    res.status(500).json("Invalid name or password!");
                }
                req.login(user, error => {
                    if (error) {
                        next(error);
                        return;
                    }

                    res.status(201).json({ user });
                });
            });
            auth(req, res, next);
        },
        logout(req, res) {
            req.logout();
            res.status(200);
        }


    };
};