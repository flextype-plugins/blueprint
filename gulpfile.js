const gulp         = require('gulp');
const concat       = require('gulp-concat');
const csso         = require('gulp-csso');
const autoprefixer = require('gulp-autoprefixer');
const sass         = require('gulp-sass');
const size         = require("gulp-size");
const gzip         = require("gulp-gzip");
const rename       = require("gulp-rename")
sass.compiler      = require('node-sass');

/**
 * Task: gulp css
 */
gulp.task("css", function () {
    return gulp
        .src([
            // Select2
            'node_modules/select2/dist/css/select2.min.css',

            // Flatpickr
            'node_modules/flatpickr/dist/flatpickr.min.css',

            // Blueprints
            'assets/src/scss/blueprints.scss'
        ])
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            overrideBrowserslist: [
                "last 1 version"
            ],
            cascade: false
        }))
        .pipe(csso())
        .pipe(concat('blueprints.min.css'))
        .pipe(gulp.dest("assets/dist/css/"))
        .pipe(size({ showFiles: true }))
        .pipe(gzip())
        .pipe(rename("blueprints.min.css.gz"))
        .pipe(gulp.dest("assets/dist/css/"))
        .pipe(size({ showFiles: true, gzip: true }));
});

/**
 * Task: gulp js
 */
gulp.task('js', function () {
    return gulp
        .src([
            // jQuery
            'node_modules/jquery/dist/jquery.min.js',

            // Select2
            'node_modules/select2/dist/js/select2.min.js',

            // Flatpickr
            'node_modules/flatpickr/dist/flatpickr.min.js',

            // Bootstrap
            'node_modules/bootstrap/dist/js/bootstrap.bundle.min.js',

            // Form Validation
            'assets/src/js/validation.js',

            // Flextype UI JS
            'blocks/blocks/InputDateTimePicker/block.js',
            'blocks/blocks/InputSelect/block.js',
            'blocks/blocks/InputTags/block.js',
        ])
        .pipe(concat('blueprints.min.js'))
        .pipe(size({ showFiles: true }))
        .pipe(gulp.dest('assets/dist/js/'))
        .pipe(gzip())
        .pipe(rename("blueprints.min.js.gz"))
        .pipe(gulp.dest("assets/dist/js/"))
        .pipe(size({ showFiles: true, gzip: true }));
});

/**
 * Task: gulp flatpickr-langs
 */
gulp.task('flatpickr-langs', function () {
    return gulp
        .src(['node_modules/flatpickr/dist/*l10n/**/*.js'])
        .pipe(size({ showFiles: true }))
        .pipe(gulp.dest('assets/dist/lang/flatpickr'));
});

/**
 * Task: gulp default
 */
gulp.task('default',
    gulp.series(
        'flatpickr-langs',
        'css',
        'js'
    )
);

/**
 * Task: gulp watch
 */
gulp.task('watch', function () {
    gulp.watch(
        ["blocks/**/*.html", "assets/src/"],
        gulp.series('default')
    );
});
