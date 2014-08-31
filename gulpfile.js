var gulp = require('gulp');
var karma = require('karma').server;
var rjs = require('gulp-requirejs');
var uglify = require('gulp-uglify');
var zip = require('gulp-zip');

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
    return gulp.src(['src/scripts/*', 'src/*.html'])
        .pipe(zip('client.zip'))
        .pipe(gulp.dest('dist'));
});

gulp.task('default', ['tdd']);
gulp.task('package', ['build', 'compress']);
