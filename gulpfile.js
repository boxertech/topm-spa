var gulp = require('gulp');
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

