/*globals $ */
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _templates = require("../../../helpers/templates.js");

var _templates2 = _interopRequireDefault(_templates);

var _notifier = require("../../../helpers/notifier.js");

var _notifier2 = _interopRequireDefault(_notifier);

var _blogsData = require("../data/blogs-data.js");

var _blogsData2 = _interopRequireDefault(_blogsData);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    all: function all(context) {
        Promise.all([_blogsData2.default.all(), _templates2.default.load("list-blogs")]).then(function (_ref) {
            var _ref2 = _slicedToArray(_ref, 2),
                blogs = _ref2[0],
                template = _ref2[1];

            console.log(blogs);
            context.$element().html(template({
                blogs: blogs
            }));
        });
    },
    home: function home(context) {
        Promise.all([_blogsData2.default.all(), _templates2.default.load("home")]).then(function (_ref3) {
            var _ref4 = _slicedToArray(_ref3, 2),
                blogs = _ref4[0],
                template = _ref4[1];

            var homePageBlogs = [];
            homePageBlogs.push(blogs[3]);
            homePageBlogs.push(blogs[6]);
            homePageBlogs.push(blogs[1]);

            context.$element().html(template({
                blogs: homePageBlogs,
                fromTheBlog: blogs
            }));
        });
    },
    byId: function byId(context) {
        var id = context.params.id;
        Promise.all([_blogsData2.default.byId(id), _templates2.default.load("blog")]).then(function (_ref5) {
            var _ref6 = _slicedToArray(_ref5, 2),
                blog = _ref6[0],
                template = _ref6[1];

            var user = localStorage.getItem("user");
            var newUser = JSON.parse(user);

            context.$element().html(template(blog.blog));
            $("#leave-reply-submit").on("click", function (ev) {
                ev.preventDefault();
                var comment = {
                    content: $("#leave-reply-text").val(),
                    postedBy: newUser.username || "Stranger"
                };
                _blogsData2.default.addComment(id, comment);
                location.reload(true);
            });
        });
    },
    post: function post(context) {
        _templates2.default.load("blog-create").then(function (template) {
            context.$element().html(template());

            $("#btn-create-post").on("click", function () {
                var user = localStorage.getItem("user");
                var newUser = JSON.parse(user);

                var post = {
                    title: $("#title").val(),
                    category: $("#category").val(),
                    image: $("#image").val(),
                    videoUrl: $("#videoUrl").val(),
                    article: $("#article").val(),
                    postedBy: newUser.username

                };

                _blogsData2.default.create(post).then(function () {
                    _notifier2.default.send("Post created!");
                    context.redirect("#/home");
                });
            });
        });
    }
};
/*globals $ */
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

require("jquery");

var _userData = require("../data/user-data.js");

var _userData2 = _interopRequireDefault(_userData);

var _templates = require("../../../helpers/templates.js");

var _templates2 = _interopRequireDefault(_templates);

var _notifier = require("../../../helpers/notifier.js");

var _notifier2 = _interopRequireDefault(_notifier);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    register: function register(context) {
        _templates2.default.load("register").then(function (template) {
            context.$element().html(template());

            $("#btn-reg").on("click", function () {
                var username = $("#reg-username").val();
                var password = $("#reg-password").val();
                var email = $("#reg-email").val();

                if (username.length < 6 || password.length < 6) {
                    _notifier2.default.send("Invalid username or password");
                    _notifier2.default.explain("Password and username must be longer than 6 symbols", "Check your input", "warning");
                }
                var userInfo = {
                    username: username,
                    password: password,
                    email: email
                };
                _userData2.default.register(userInfo).then(function (user) {
                    $("#register").hide();
                    $("#logout").show();
                    _notifier2.default.send(user.username + " registered!");
                    context.redirect("#/home");
                    //location.reload(true);
                });
            });
        });
    },
    login: function login(context) {
        _templates2.default.load("login").then(function (template) {
            context.$element().html(template());

            $("#btn-login").on("click", function () {
                var userInfo = {
                    username: $("#login-username").val(),
                    password: $("#login-password").val()
                };

                _userData2.default.login(userInfo).then(function (user) {
                    $("#login").hide();
                    $("#register").hide();
                    $("#logout").show();
                    localStorage.setItem("user", JSON.stringify(user));
                    _notifier2.default.send(user.username + " logged in!");
                    _notifier2.default.explain("Welcome!", "Now you can leave comments!", "ok");
                    context.redirect("#/home");
                });
            });
        });
    }

};
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _requester = require("../../../helpers/requester.js");

var _requester2 = _interopRequireDefault(_requester);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    all: function all() {
        return _requester2.default.get("/blogs");
    },
    byId: function byId(id) {
        return _requester2.default.get("/blogs/" + id).then(function (blog) {
            return blog;
        });
    },
    create: function create(post) {
        return _requester2.default.post("/blogs", post);
    },
    addComment: function addComment(id, comment) {
        return _requester2.default.post("/blogs/" + id, comment);
    }
};
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _requester = require("../../../helpers/requester.js");

var _requester2 = _interopRequireDefault(_requester);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    register: function register(userInfo) {
        return _requester2.default.post("/register", userInfo).then(function (resp) {
            return resp.resUser;
        });
    },
    login: function login(userInfo) {
        return _requester2.default.post("/login", userInfo).then(function (resp) {
            var user = resp.user;
            return user;
        });
    },
    logout: function logout() {
        return _requester2.default.post("/logout").then(function (resp) {
            console.log(resp);
        });
    }
};
"use strict";

require("jquery");

$(document).ready(function () {
    // Animate loader off screen
    $(".loader").fadeOut("slow");
}); /*globals $ */
/*globals $ */
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

require("jquery");

require("amaran");

exports.default = {
    send: function send(message) {
        $.amaran({
            "message": message,
            "position": "top right",
            "delay": 5000
        });
    },
    explain: function explain(title, message, theme) {
        $.amaran({
            "theme": "awesome " + theme || "",
            "content": {
                "title": title || "",
                "message": message,
                "info": ""
            },
            "position": "top right",
            "delay": 5000
        });
    }
};
/*globals $ */
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

require("jquery");

exports.default = {
    get: function get(url, headers) {
        return new Promise(function (resolve, reject) {
            $.ajax({
                url: url,
                method: "GET",
                contentType: "application/json",
                headers: headers,
                success: function success(data) {
                    resolve(data);
                },
                error: function error(err) {
                    reject(err);
                }
            });
        });
    },
    post: function post(url, data, headers) {
        return new Promise(function (resolve, reject) {
            $.ajax({
                url: url,
                method: "POST",
                headers: headers,
                contentType: "application/json",
                data: JSON.stringify(data),
                success: function success(resData) {
                    resolve(resData);
                },
                error: function error(err) {
                    reject(err);
                }
            });
        });
    },

    put: function put(url, data, headers) {
        return new Promise(function (resolve, reject) {
            $.ajax({
                url: url,
                method: "PUT",
                headers: headers,
                contentType: "application/json",
                data: JSON.stringify(data),
                success: function success(resData) {
                    resolve(resData);
                },
                error: function error(err) {
                    reject(err);
                }
            });
        });
    },

    del: function del(url, data, headers) {
        return new Promise(function (resolve, reject) {
            $.ajax({
                url: url,
                method: "DELETE",
                headers: headers,
                contentType: "application/json",
                data: JSON.stringify(data),
                success: function success(resData) {
                    resolve(resData);
                },
                error: function error(err) {
                    reject(err);
                }
            });
        });
    }
};
/*globals $ */
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

require("jquery");

var handlebars = window.handlebars || window.Handlebars;

exports.default = {
    load: function load(name) {
        var url = "app/js/templates/" + name + ".handlebars";

        return new Promise(function (resolve, reject) {
            $.ajax({
                url: url,
                success: function success(data) {
                    resolve(handlebars.compile(data));
                },
                error: function error(err) {
                    reject(err);
                }
            });
        });
    }
};
/*globals Sammy, $ */
"use strict";

var _blogsController = require("./app/js/controllers/blogsController.js");

var _blogsController2 = _interopRequireDefault(_blogsController);

var _usersController = require("./app/js/controllers/usersController.js");

var _usersController2 = _interopRequireDefault(_usersController);

var _notifier = require("./helpers/notifier.js");

var _notifier2 = _interopRequireDefault(_notifier);

require("./helpers/loader.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
    var sammyApp = Sammy("#content", function () {
        this.get("#/", function () {
            this.redirect("#/home");
        });
        this.get("#/home", _blogsController2.default.home);
        this.get("#/blog/:id", _blogsController2.default.byId);
        this.get("#/blogs", _blogsController2.default.all);
        this.get("#/blogs/add", _blogsController2.default.post);
        this.get("#/register", _usersController2.default.register);
        this.get("#/login", _usersController2.default.login);
    });
    $(function () {
        sammyApp.run("#/");
        $("#logout").on("click", function () {
            localStorage.clear();
            $("#register").show();
            $("#login").show();
            $("#logout").hide();
            _notifier2.default.send("You logged out");
        });
    });
})();