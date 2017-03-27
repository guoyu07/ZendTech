module.exports = function() {
    const BlogPost = require("./blog-post-model");
    const User = require("./user-model");

    return {
        BlogPost,
        User
    };
};