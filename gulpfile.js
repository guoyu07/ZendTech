let gulp = require('gulp'),
    babel = require('gulp-babel'),
    autoprefixer = require('autoprefixer'),
    sass = require('gulp-sass'),
    clean = require('gulp-clean'),
    esLint = require('gulp-eslint'),
    uglify = require('gulp-uglify'),
    htmlMinimizer = require('gulp-html'),
    cssnano = require('gulp-cssnano'),
    rename = require('gulp-rename'),
    notify = require('gulp-notify'),
    livereload = require('gulp-livereload');

gulp.task("clean", function() {
    return gulp
        .src("build", {
            read: false,
        })
        .pipe(clean());
});

gulp.task('sass', function() {
    return sass('./pubic/**/*.scss', { style: 'expanded' })
        .pipe(gulp.dest('./build/css'))
});

gulp.task('scripts', function() {
    return gulp.src('.public/**/*.js')
        .pipe(esLint('.eslintrc'))
        .pipe(gulp.dest('./build/js'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(uglify())
        .pipe(gulp.dest('./build/js'))
        .pipe(notify({ message: 'Scripts task complete' }));
});
gulp.task("compile", ["compile:js", "compile:sass"]);

gulp.task("copy:all", () => {
    return gulp
        .src([
            "./src/**/*.html",
            "./src/**/*.js",
            "./src/**/*.pug",
            "./src/**/*.css",
            "!./src/static/**/*.js",
        ])
        .pipe(gulp.dest("./build"));
});

gulp.task("copy", ["copy:all"]);

gulp.task('default', function() {
    gulp.start('sass', 'scripts');
});