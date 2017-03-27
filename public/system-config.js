/*globals SystemJS */
SystemJS.config({
    transpiler: "plugin-babel",
    map: {
        "babili": "../node_modules/babili/bin/babili.js",
        "plugin-babel": "./node_modules/systemjs-plugin-babel/plugin-babel.js",
        "systemjs-babel-build": "./node_modules/systemjs-plugin-babel/systemjs-babel-browser.js",
        "jquery": "./bower_components/jquery/dist/jquery.min.js",
        "amaran": "./bower_components/AmaranJS/dist/js/jquery.amaran.min.js",
        "sha1": "./node_modules/sha1/sha1.js",
        "main": "./main.js"
    }
});