'use strict';

var gulp = require("gulp");
var config = require('../config');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var handleErrors = require('../utils/handleErrors');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var browserSync = require("browser-sync");

gulp.task('scripts', function() {
	gulp.src(config.scripts.src)
		.pipe(sourcemaps.init())
		.pipe(concat('main.js'))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest(config.scripts.dst));
});


gulp.task('scripts-browserify', function() {
	for(var x=0; x<config.scripts.browserify.bundles.length; x++) {

		var src = config.scripts.browserify.bundles[x];
		var arrPath = src.split('/');
		
		browserify(src)
			.bundle()
			.on('error', handleErrors)
			.pipe(source(arrPath[arrPath.length-1]))
			.pipe(gulp.dest(config.scripts.dst))
			.pipe(browserSync.reload({stream: true}));
	}
});


gulp.task('scripts-browserify-dist', function() {
	var browserified = transform(function(filename) {
		var b = browserify(filename);
		return b.bundle();
	});

	gulp.src(config.scripts.src)
		.pipe(browserified)
		.pipe(concat('main.js'))
		.pipe(gulp.dest(config.scripts.dst));
});


gulp.task('scripts-dist', function() {
	gulp.src(config.scripts.src)
		.pipe(uglify().on('error', handleErrors))
		.pipe(concat('main.js'))
		.pipe(gulp.dest(config.scripts.dst));
});