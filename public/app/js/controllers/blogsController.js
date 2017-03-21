'use strict';
import 'jquery';
import 'amaran';
import templates from '../../../helpers/templates.js';
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
                homePageBlogs.push(blogs[0]);
                homePageBlogs.push(blogs[1]);
                homePageBlogs.push(blogs[2]);
                context.$element().html(template({
                    blogs: homePageBlogs,
                    fromTheBlog: blogs
                }));
            });
    },
    byId: function(context) {
        let id = context.params['id'];
        Promise.all([data.byId(id), templates.load('blog')])
            .then(function([blog, template]) {
                context.$element().html(template(blog.blog));
            })
    },
    post: function(context) {
        templates.load('blog-post')
            .then(template => {
                context.$element().html(template());

                $('#btn-create-post').on('click', function(ev) {
                    let $this = $(this);
                    let $form = $('create-form');

                    let post = {
                        title: $('#title').val(),
                        category: $('#category').val(),
                        image: $('#image').val(),
                        videoUrl: $('#videoUrl').val(),
                        article: $('#article').val(),
                        postedBy: 'Robert Gravis'

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