'use strict';
module.exports = function(data) {
    return {
        create(req, res) {
            let blogPost = {
                title: req.body.title,
                article: req.body.article,
                image: req.body.image || "Not Provided",
                videoUrl: req.body.videoUrl || "Not Provided",
                category: req.body.category,
                postedBy: req.body.postedBy,
                postedOn: req.body.postedOn,
                comments: req.body.comments
            }
            data.blogData.create(blogPost)
                .then(blog => {
                    if (!blog) {
                        res.status(404).json('Blog not created!');
                    }
                    res.status(201).json(blog);
                }).catch(err => res.status(500).json(err));
        },

        getAll(req, res) {
            data.blogData.all()
                .then(blogs => {
                    res.status(200).json(blogs);
                }).catch((err) => res.status(500).json(err, "Blogs not found"));
        },

        getById(req, res) {
            data.blogData.getById(req.params.id)
                .then(blog => {
                    if (!blog) {
                        res.status(404).json('Invalid ID');
                    }
                    res.status(200).json({ blog });
                }).catch((err) => res.status(500).json(err, 'Blog not found'));
        },
        addComment(req, res) {
            let comment = {
                postedBy: req.body.postedBy,
                postedOn: req.body.postedOn,
                content: req.body.content
            }

            data.blogData.addComment(req.params.id, comment)
                .then(blog => {
                    if (!blog) {
                        res.status(400).json('Comments not added!');
                    }
                    res.status(200);

                });
        }
    }
}