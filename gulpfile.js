var gulp = require('gulp');
var jshint = require('gulp-jshint');
var mocha = require('gulp-mocha');
var nodemon = require('gulp-nodemon');
var browserSync = require('browser-sync').create();
var watch = require('gulp-watch');
//
// gulp.task('lint', function() {
//   return gulp.src('index.js')
//     .pipe(jshint())
//     .pipe(jshint.reporter('default'))
//     .pipe(jshint.reporter('fail'));
// });
//
// gulp.task('develop', function () {
//   nodemon({
//     script: 'index.js',
//     ext: 'html js',
//     env: { 'NODE_ENV': 'development' }
//   })
//     .on('restart', function () {
//       console.log('restarted!')
//     })
// });
//
// gulp.task('test', function () {
//     gulp.src('test/**.js')
//         .pipe(mocha({
//             reporter: 'nyan',
//             clearRequireCache: true,
//             ignoreLeaks: true
//         }));
// });
//
// gulp.task('serve', function () {
//
//     // Serve files from the root of this project
//     browserSync.init({
//         server: {
//             baseDir: "./public"
//         }
//     });
// });
//
// gulp.task('watch', ['serve'], function(){
//     gulp.watch("*.**").on("change", browserSync.reload);
// });

// // Default Task
// gulp.task('default', ['lint', 'test', 'develop']);


gulp.task('default', ['browser-sync'], function () {
});

gulp.task('browser-sync', ['nodemon'], function() {
	browserSync.init(null, {
		proxy: "http://localhost:5000",
        files: ["public/**/*.*"],
        browser: "google chrome",
        port: 7000,
	});
});
gulp.task('nodemon', function (cb) {

	var started = false;

	return nodemon({
		script: 'index.js'
	}).on('start', function () {
		// to avoid nodemon being started multiple times
		// thanks @matthisk
		if (!started) {
			cb();
			started = true;
		}
	});
});
