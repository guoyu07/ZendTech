module.exports = function(data) {
    const userController = require("./user-controller")(data);
    const blogController = require("./blog-controller")(data);
    const authController = require("./authentication-controller")(data);

    return {
        userController,
        blogController,
        authController
    }
}