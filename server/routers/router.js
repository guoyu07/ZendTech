'use strict';
const express = require('express');
const config = require('../config/constants')
let Router = express.Router;
module.exports = function({ app, controller }) {
    let router = new Router();

    router
        .get('/blogs', controller.blogController.getAll)
        .get('/blogs/:id', controller.blogController.getById)
        .post('/blogs/:id', controller.blogController.addComment)
        .get('/users', controller.userController.getAll)
        .get('/users/:id', controller.userController.getById)
        .post('/blogs', controller.blogController.create)
        .post('/register', controller.authController.register)
        .post('/login', controller.authController.login)
        .post('/logout', controller.authController.logout);
    app.use(router);

    return router;
}