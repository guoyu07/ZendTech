'use strict';
import requester from '../../../helpers/requester.js';

export default {
    all: function() {
        return requester.get('/blogs');
    },
    byId: function(id) {
        return requester.get('/blogs/' + id).then(blog => {
            return blog;
        });
    },
    create: function(post) {
        return requester.post('/blogs', post);
    }
}