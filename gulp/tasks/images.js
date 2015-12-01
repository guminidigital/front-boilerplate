'use strict';

var gulp = require("gulp");
var config = require('../config');
var plumber = require('gulp-plumber');
var imagemin = require('gulp-imagemin');
var browserSync = require("browser-sync");

gulp.task('images', function() {
	gulp.src(config.images.src)
		.pipe(plumber())
		.pipe(gulp.dest(config.images.dst))
		.pipe(browserSync.reload({stream: true}));
});


gulp.task("images-build", function() {
	gulp.src(config.images.src)
		.pipe(plumber())
		.pipe(imagemin())
		.pipe(gulp.dest(config.images.dst));
})

