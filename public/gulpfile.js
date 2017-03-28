let gulp = require("gulp"),
    gulpSync = require("gulp-sync")(gulp),
    browserSync = require("browser-sync").create(),
    sass = require("sass"),
    clean = require("gulp-clean"),
    concat = require("gulp-concat"),
    rename = require("gulp-rename"),
    minify = require("gulp-minify"),
    cleanCSS = require("gulp-clean-css"),
    babel = require("gulp-babel"),
    babelify = require("babelify"),
    browserify = require("browserify"),
    eslint = require("gulp-eslint"),
    sassLint = require("gulp-sass-lint");

gulp.task("scripts", () => {
    return gulp.src(["app/**/*.js", "helpers/*.js", "main.js", "!node_modules/**", "!bower_components/**"])
        .pipe(babel({
            presets: ["es2015"]
        }))
        .pipe(concat("all.js"))
        .pipe(minify())
        .pipe(gulp.dest("dist/"));
});

gulp.task("sync", () => {
    let files = [
        "app/*.js",
        "*.html",
        "app/css/*.css"
    ];
    browserSync.init(files, {
        proxy: "localhost:3001/"
    });
});

gulp.task("clean", () => {
    gulp.src("dist", { read: false })
        .pipe(clean());
});

gulp.task("lint:sass", () => {
    return gulp.src("app/sass/**/*.scss")
        .pipe(sassLint())
        .pipe(sassLint.format())
        .pipe(sassLint.failOnError());
});

gulp.task("lint:js", () => {
    return gulp.src(["app/**/*.js", "!node_modules/**", "!bower_components/**", "!build/**", "!dist/**"])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failOnError());
});

gulp.task("sass", () => {
    return gulp.src("app/sass/**/.scss")
        .pipe(sass())
        .pipe(gulp.dest("app/css"));
});

gulp.task("css", () => {
    return gulp
        .src(["app/css/**/*.css"])
        .pipe(cleanCSS())
        .pipe(gulp.dest("dist/css"));
});
gulp.task("lint", ["lint:js", "lint:sass"]);

gulp.task("build", gulpSync.sync(["clean", "scripts", "css"]));

gulp.task("default", () => {
    gulp.start("build");
});