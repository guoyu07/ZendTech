module.exports = function(config, models) {
    const blogData = require('./blog-post-data')(models.BlogPost);
    const userData = require('./users-data')(models.User);

    return {
        blogData,
        userData
    }
}