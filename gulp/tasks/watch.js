'use strict';

var gulp = require("gulp");
var config = require('../config');
var watch = require("gulp-watch");
var browserSync = require("browser-sync");

gulp.task('watch', function() {
	// SASS
	watch(config.less.watch, function() {
		gulp.start("less", browserSync.reload);
	});

	// SCRIPTS
	watch(config.scripts.watch, function() {
		gulp.start("scripts-browserify", browserSync.reload);
	});

	// IMAGES
	watch(config.images.watch, function() {
		gulp.start("images", browserSync.reload);
	});

	// NUNJUCKS
	watch(config.nunjucks.watch, function() {
		gulp.start("nunjucks-watch", browserSync.reload);
	});

	// COPY STATIC FILES
	watch(config.copy.watch, function() {
		gulp.start("copy", browserSync.reload);
	});
});