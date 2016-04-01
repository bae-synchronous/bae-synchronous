var gulp = require('gulp');
var jshint = require('gulp-jshint');
var mocha = require('gulp-mocha');
var nodemon = require('gulp-nodemon');
var browserSync = require('browser-sync').create();
var watch = require('gulp-watch');

gulp.task('lint', function() {
  return gulp.src([
    './*.js',
    './public/**/.js',
    './public/*.js',
    './server/*.js',
    './test/*.js'
  ])
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(jshint.reporter('fail'));
});

gulp.task('develop', function () {
  nodemon({
    script: 'index.js',
    ext: 'html js',
    env: { 'NODE_ENV': 'development' },
    tasks: ['lint', 'test']
  })
  .on('restart', function () {
    console.log('restarted!');
  });
});

gulp.task('test', function () {
  gulp.src('test/**.js')
    .pipe(mocha({
      clearRequireCache: true,
      ignoreLeaks: true
  }));
});

// Default Task
gulp.task('default', ['lint', 'test', 'develop']);
