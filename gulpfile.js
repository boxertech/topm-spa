var gulp = require('gulp');
var eslint = require('gulp-eslint');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();

//Server
gulp.task('serve-loadme', ['lint', 'sass_loadme'], function (done) {
	browserSync.init({
		server: {
			baseDir: ["loadme/", "./"],
			serveStatic: ["/node_modules"]
		}
	}, function callback() {
		gulp.watch("loadme/**/*.html", ["reload"]);
		gulp.watch("loadme/**/*.js", ["js_watch_loadme", "reload"]);
		gulp.watch("loadme/**/*.scss", ["sass_loadme"]);

		done();
	});

});

//Server
gulp.task('serve-directme', ['lint', 'sass_directme'], function (done) {
	browserSync.init({
		server: {
			baseDir: ["directme/", "./"],
			serveStatic: ["/node_modules"]
		}
	}, function callback() {
		gulp.watch("directme/**/*.html", ["reload"]);
		gulp.watch("directme/**/*.js", ["js_watch_directme", "reload"]);
		gulp.watch("directme/**/*.scss", ["sass_directme"]);

		done();
	});

});

// TODO: clean up lint task
gulp.task('lint', function () {
	return gulp.src(['**/*.js', '!node_modules/**'])
		.pipe(eslint())
		.pipe(eslint.format())
		.pipe(eslint.failAfterError());
});
gulp.task('reload', function () {
	browserSync.reload();
});

gulp.task('sass_loadme', function () {
	return gulp.src(['loadme/**/*.scss', '!node_modules/**'])
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('loadme'))
		.pipe(browserSync.stream());
});
gulp.task('sass_directme', function () {
	return gulp.src(['directme/**/*.scss', '!node_modules/**'])
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('directme'))
		.pipe(browserSync.stream());
});
gulp.task('js_watch_loadme', function () {
	console.log("js_watch_loadme: ");
	return gulp.src(["loadme/**/*.js", "!node_modules/**"])
		.pipe(eslint())
		.pipe(eslint.format())
		.pipe(eslint.failAfterError());
});
gulp.task('js_watch_directme', function () {
	console.log("js_watch_directme: ");
	return gulp.src(["directme/**/*.js", "!node_modules/**"])
		.pipe(eslint())
		.pipe(eslint.format())
		.pipe(eslint.failAfterError());
});

// function js_watch(files) {
// 	// TODO: confirm files exists and is array
// 	console.log("js_watch: ", files);
// 	files.push("!node_modules/**");
// 	console.log("js_watch pushed: ", files);
// 	return gulp.src(files)
// 		.pipe(eslint())
// 		.pipe(eslint.format())
// 		.pipe(eslint.failAfterError());
// }
// function sass_watch(files) {
// 	// TODO: confirm files exists and is array
// 	console.log("sass_watch: ", files);
// 	files.push("!node_modules/**");
// 	console.log("sass_watch pushed: ", files);
// 	gulp.src(files)
// 		.pipe(sass().on('error', sass.logError))
// 		.pipe(gulp.dest('./'));
// 	console.log("sass_watch sassed: ", files);
// 	return;
// }

