let gulp = require('gulp'),
    browserSync = require('browser-sync').create();
// babel = require('gulp-babel'),
// autoprefixer = require('autoprefixer'),
// sass = require('gulp-sass'),
// clean = require('gulp-clean'),
// eslint = require('gulp-eslint'),
// uglify = require('gulp-uglify'),
// concat = require('gulp-concat'),
// htmlminimizer = require('gulp-html'),
// cssnano = require('gulp-cssnano'),
// rename = require('gulp-rename'),
// notify = require('gulp-notify'),
// livereload = require('gulp-livereload');


gulp.task('sync', function() {
    let files = [
        'public/**/*.js',
        'public/**/*.html',
        'public/app/css/*.css'
    ];
    browserSync.init(files, {
        proxy: 'localhost:3001/'
    })
})
gulp.task('default', function() {
    gulp.start('sync');
});