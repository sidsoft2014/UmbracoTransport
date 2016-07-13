var gulp = require('gulp'),
    gulpIf = require('gulp-if'),
    browserSync = require('browser-sync').create(),
    cssnano = require('gulp-cssnano'),
    del = require('del'),
    sass = require('gulp-sass'),
    uglify = require('gulp-uglify')
inject = require('gulp-inject'),
angularFilesort = require('gulp-angular-filesort');

var paths = {
    sass: {
        src: "./src/styles/sass/**/*.scss",
        dest: "./sitefiles"
    },
    js: {
        src: "./src/scripts/js/**/*.js",
        dest: "./sitefiles"
    },
    angularPages: {
        src: './src/scripts/ng/**/*.js',
        dest: './Views/*.cshtml'
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
        .pipe(gulp.dest(paths.sass.dest))
        .pipe(browserSync.stream());
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
        .pipe(gulp.dest(paths.js.dest))
        .pipe(browserSync.stream());
});
/* END JS TASKS */

/* INJECT TASKS */
gulp.task('inject', function () {
    gulp.src(paths.angularPages.dest)
    .pipe(inject(
      gulp.src(paths.angularPages.src)
        .pipe(angularFilesort()), { relative: true }
      ))
    .pipe(gulp.dest('./Views'));
});
gulp.task('inject:serve', function () {
    gulp.src(paths.angularPages.dest)
    .pipe(inject(
      gulp.src(paths.angularPages.src)
        .pipe(angularFilesort()), { relative: true }
      ))
    .pipe(gulp.dest('./Views'))
        .pipe(browserSync.stream());
});
/* END INJECT TASKS */


gulp.task('serve', ['sass:serve', 'js:serve', 'inject:serve'], function () {
    browserSync.init({
        proxy: "http://localhost:180"
    });

    gulp.watch(paths.sass.src, ['sass:serve']);
    gulp.watch(paths.js.src, ['js:serve']);
    gulp.watch(paths.angularPages.src, ['inject:serve']);
})

gulp.task('watch', ['sass:dev', 'js:dev'], function () {
    gulp.watch(paths.sass.src, ['sass:dev']);
    gulp.watch(paths.js.src, ['js:dev']);
});

gulp.task('default', ['watch']);