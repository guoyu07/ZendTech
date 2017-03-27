"use strict";

module.exports = function(data) {
    return {
        getAll(req, res) {
            data.userData.all()
                .then((err, users) => {
                    if (err) {
                        res.status(400);
                    }
                    res.status(200).json({ users });
                });
        },

        getById(req, res) {
            data.userData.getById(req.params.id)
                .then(user => {
                    res.json({ user });
                });
        }
    };
};