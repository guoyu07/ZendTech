let gulp = require("gulp"),
    gulpSync = require("gulp-sync")(gulp),
    browserSync = require("browser-sync").create(),
    clean = require("gulp-clean"),
    minify = require("gulp-minify"),
    babel = require("gulp-babel"),
    babelify = require("babelify"),
    browserify = require("browserify"),
    eslint = require("gulp-eslint"),
    sassLint = require('gulp-sass-lint'),
    source = require("vinyl-source-stream"),
    buffer = require("vinyl-buffer"),
    gutil = require("gulp-util"),
    sourcemaps = require("gulp-sourcemaps");

gulp.task("scripts:main", function() {
    // let b = browserify({
    //     entries: "./public/main.js",
    //     debug: true
    // });

    // return b.bundle()
    //     .pipe(source("public/**/*.js"))
    //     // Add transformation tasks to the pipeline here.
    //     .pipe(minify())
    //     .on("error", gutil.log)
    //     .pipe(gulp.dest("public/build"));

    return gulp.src(["public/main.js", "!public/node_modules/**", "!public/bower_components/**"])
        .pipe(babel({ presets: ["babili"] }))
        .pipe(gulp.dest("public/build/"));
});
gulp.task("scripts:app", function() {
    return gulp.src(["public/app/**/*.js", "!public/node_modules/**", "!public/bower_components/**"])
        .pipe(babel({ presets: ["babili"] }))
        .pipe(gulp.dest("public/build/app"));
});
gulp.task("scripts:helpers", function() {
    return gulp.src(["public/helpers/*.js", "!public/node_modules/**", "!public/bower_components/**"])
        .pipe(babel({ presets: ["babili"] }))
        .pipe(gulp.dest("public/build/helpers"));
});

gulp.task("sync", function() {
    let files = [
        "public/**/*.js",
        "public/**/*.html",
        "public/app/css/*.css"
    ];
    browserSync.init(files, {
        proxy: "localhost:3001/"
    });
});
gulp.task("clean", () => {
    gulp.src("public/build", { read: false })
        .pipe(clean());
});

gulp.task("lint:sass", function() {
    return gulp.src("public/app/sass/**/*.scss")
        .pipe(sassLint())
        .pipe(sassLint.format())
        .pipe(sassLint.failOnError());
});

gulp.task("lint:js", function() {
    return gulp.src(["public/**/*.js", "!public/node_modules/**", "!public/bower_components/**", "!public/build/**"])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failOnError());
});
gulp.task("lint", ["lint:js", "lint:sass"]);

gulp.task("build", gulpSync.sync(["clean", "scripts:main", "scripts:helpers", "scripts:app"]));

gulp.task("default", function() {
    gulp.start("build");
});