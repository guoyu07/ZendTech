'use strict';
import 'jquery';
import data from '../data/user-data.js';
import templates from '../../../helpers/templates.js';
import notifier from '../../../helpers/notifier.js';

export default {
    register: function(context) {
        templates.load('register')
            .then(template => {
                context.$element().html(template());

                $('#btn-reg').on('click', function() {
                    let username = $('#reg-username').val();
                    let password = $('#reg-password').val();
                    let email = $('#reg-email').val();

                    if (username.length < 6 || password.length < 6) {
                        notifier.send('Invalid username or password');
                        notifier.explain(
                            'Password and username must be longer than 6 symbols',
                            'Check your input', 'warning');
                        return;
                    }
                    let user = {
                        username: username,
                        password: password,
                        email: email
                    }
                    data.register(user).then(user => {
                        $('#register').hide();
                        $('#logout').show();
                        notifier.send(`${user.username} registered!`);

                        context.redirect('#/home');
                        location.reload(true);
                    });
                });
            });
    },
    login: function(context) {
        templates.load('login')
            .then(template => {
                context.$element().html(template());

                $('#btn-login').on('click', function() {
                    let userInfo = {
                        username: $('#login-username').val(),
                        password: $('#login-password').val(),
                    }

                    data.login(userInfo)
                        .then(user => {
                            $('#login').hide();
                            $('#register').hide();
                            $('#logout').show();
                            localStorage.setItem('user', JSON.stringify(user));
                            notifier.send(`${user.username} logged in!`);
                            notifier.explain('Welcome!', 'Now you can leave comments!', 'ok');
                            context.redirect('#/home');
                        });
                });
            });
    }

}