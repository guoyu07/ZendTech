'use strict';
import 'jquery';
import 'amaran';
import templates from '../../../helpers/templates.js';
import notifier from '../../../helpers/notifier.js';
import data from '../data/blogs-data.js';

export default {
    all: function(context) {
        Promise.all([data.all(), templates.load('list-blogs')])
            .then(function([blogs, template]) {
                context.$element().html(template({
                    blogs: blogs
                }));
            });
    },
    home: function(context) {
        Promise.all([data.all(), templates.load('home')])
            .then(function([blogs, template]) {
                let homePageBlogs = [];
                console.log(blogs);
                homePageBlogs.push(blogs[3]);
                homePageBlogs.push(blogs[2]);
                homePageBlogs.push(blogs[7]);

                context.$element().html(template({
                    blogs: homePageBlogs,
                    fromTheBlog: blogs
                }));
            });
    },
    byId: function(context) {
        let id = context.params['id'];
        Promise.all([data.byId(id), templates.load('blog')])
            .then(function([blogRes, template]) {
                let user = localStorage.getItem('user');
                let newUser = JSON.parse(user);
                let length = blogRes.blog.comments.length - 1;
                let blog = blogRes.blog;
                context.$element().html(template(blog));
                $('#leave-reply-submit').on('click', function(ev) {
                    ev.preventDefault();
                    let comment = {
                        content: $('#leave-reply-text').val(),
                        postedBy: newUser.username || 'Stranger',
                    }
                    data.addComment(id, comment);
                    location.reload(true);
                })
            })
    },
    post: function(context) {
        templates.load('blog-post')
            .then(template => {
                context.$element().html(template());

                $('#btn-create-post').on('click', function(ev) {
                    let $this = $(this);
                    let $form = $('create-form');
                    let user = localStorage.getItem('user');
                    let newUser = JSON.parse(user);

                    let post = {
                        title: $('#title').val(),
                        category: $('#category').val(),
                        image: $('#image').val(),
                        videoUrl: $('#videoUrl').val(),
                        article: $('#article').val(),
                        postedBy: newUser.username

                    }

                    data.create(post)
                        .then(result => {
                            $.amaran({
                                'message': 'Post created!',
                                'position': 'top right',
                                'delay': 5000
                            });
                            context.redirect('#/home');
                        })
                });
            });

    }
}