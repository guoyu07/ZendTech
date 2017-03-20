'use strict';
import blogsController from './app/controllers/blogsController.js';
import usersController from './app/controllers/usersController.js';
import requester from './helpers/requester.js';

(function() {
    let sammyApp = Sammy('#content', function() {
        this.get('#/', function() {
            this.redirect('#/home');
        });
        this.get('#/home', blogsController.home);
        this.get('#/blog/:id', blogsController.byId);
        this.get('#/blogs', blogsController.all);
        this.get('#/blogs/add', blogsController.post);
        this.get('#/register', usersController.register);

    });
    $(function() {
        sammyApp.run('#/');
    });
})();