var gulp = require('gulp');
var eslint = require('gulp-eslint');
var browserSync = require('browser-sync').create();

//Server
gulp.task('serve-loadme', function () {
	browserSync.init({
		server: {
			baseDir: ["loadme/", "./"],
			serveStatic: ["/node_modules"]
		}
	});
});

gulp.task('lint', function () {
	return gulp.src(['**/*.js', '!node_modules/**'])
		.pipe(eslint())
		.pipe(eslint.format())
		.pipe(eslint.failAfterError());
});

