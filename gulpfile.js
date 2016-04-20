var gulp = require('gulp');
var eslint = require('gulp-eslint');
var browserSync = require('browser-sync').create();
var files = {
	loadme: ["loadme/**/*.js"]
};

//Server
gulp.task('serve-loadme', function () {
	browserSync.init({
		server: {
			baseDir: ["loadme/", "./"],
			serveStatic: ["/node_modules"]
		}
	});

	gulp.watch("loadme/**/*.js", js_watch(files.loadme), browserSync.reload);
});

gulp.task('lint', function () {
	return gulp.src(['**/*.js', '!node_modules/**'])
		.pipe(eslint())
		.pipe(eslint.format())
		.pipe(eslint.failAfterError());
});

function js_watch(files) {
	return gulp.src(files)
		.pipe(eslint())
		.pipe(eslint.format())
		.pipe(eslint.failAfterError());
}

