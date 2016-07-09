var gulp = require('gulp'),
    gulpIf = require('gulp-if'),
    browserSync = require('browser-sync').create(),
    cssnano = require('gulp-cssnano'),
    del = require('del'),
    sass = require('gulp-sass'),
    uglify = require('gulp-uglify');

var paths = {
    sass: {
        src: "./src/styles/sass/**/*.scss",
        dest: "./sitefiles"
    },
    js: {
        src: "./src/scripts/js/**/*.js",
        dest: "./sitefiles"
    }
}

/* SASS TASKS */
gulp.task('sass:dev', function () {
    return gulp.src(paths.sass.src)
        .pipe(sass())
        .pipe(gulp.dest(paths.sass.dest));
});

gulp.task('sass:prod', function () {
    return gulp.src(paths.sass.src)
        .pipe(sass())
        .pipe(cssnano())
        .pipe(gulp.dest(paths.sass.dest));
});

gulp.task('sass:serve', function () {
    return gulp.src(paths.sass.src)
        .pipe(sass())
        .pipe(cssnano())
        .pipe(gulp.dest(paths.sass.dest));
});
/* END SASS TASKS */


/* JS TASKS */
gulp.task('js:dev', function () {
    return gulp.src(paths.js.src)
        .pipe(uglify())
        .pipe(gulp.dest(paths.js.dest));
});

gulp.task('js:prod', function () {
    return gulp.src(paths.js.src)
        .pipe(uglify())
        .pipe(gulp.dest(paths.js.dest));
});

gulp.task('js:serve', function () {
    return gulp.src(paths.js.src)
        .pipe(uglify())
        .pipe(gulp.dest(paths.js.dest));
});
/* END JS TASKS */

gulp.task('watch', ['sass:dev', 'js:dev'], function () {
    gulp.watch(paths.sass.src, ['sass:dev']);
    gulp.watch(paths.js.src, ['js:dev']);
});

gulp.task('default', ['watch']);