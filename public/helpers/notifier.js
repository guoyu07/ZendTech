'use strict';
import 'jquery';
import 'amaran';

export default {
    send: function(message) {
        $.amaran({
            'message': message,
            'position': 'top right',
            'delay': 5000
        });
    },
    explain: function(title, message, theme) {
        $.amaran({
            'theme': 'awesome ' + theme || '',
            'content': {
                'title': title || '',
                'message': message,
                'info': ''
            },
            'position': 'top right',
            'delay': 5000
        })
    }
}