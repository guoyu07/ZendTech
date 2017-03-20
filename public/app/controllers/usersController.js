'use strict';
import 'jquery';
import data from '../data/user-data.js';
import templates from '../../helpers/templates.js';
import CryptoJS from '../../bower_components/crypto-js/crypto-js.js';
import notifier from '../../helpers/notifier.js';

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
                        password: CryptoJS.SHA1(password).toString(),
                        email: email
                    }
                    data.register(user).then(user => {
                        console.log(user);
                        notifier.send(`${user.username} registered!`);

                        context.redirect('#/home');
                    });
                });
            });
    },
    login: function(context) {
        //TODO
    }
}