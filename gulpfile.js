var gulp = require('gulp');
var karma = require('karma').server;
var rjs = require('gulp-requirejs');
var uglify = require('gulp-uglify');
var zip = require('gulp-zip');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');

/**
 * Run test once and exit
 */
gulp.task('test', function (done) {
    karma.start({basePath: __dirname, configFile: __dirname + '/karma.conf.js', singleRun: true}, done);
});

/**
 * Watch for file changes and re-run tests on each change
 */
gulp.task('tdd', function (done) {
    karma.start({basePath: __dirname, configFile: __dirname + '/karma.conf.js'}, done);
});

gulp.task('lint', function() {
    return gulp.src(['./src/**/*.js', './test/**/*.js', '!./src/scripts/**/*.js'])
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('build', function() {
    rjs({
        name: '../node_modules/almond/almond',
        include: 'main',
        baseUrl: 'src',
        out: 'app.min.js'
    })
    .pipe(uglify())
    .pipe(gulp.dest('./src/scripts/'))
});

gulp.task('compress', function() {
    return gulp.src(['./src/scripts/*.js', './src/*.html', './src/*.css'])
        .pipe(zip('client.zip'))
        .pipe(gulp.dest('dist'));
});

gulp.task('default', ['lint', 'test']);
gulp.task('package', ['build', 'compress']);
