'use strict';

var gulp = require("gulp");
var config = require('../config');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

gulp.task('vendor', function() {
	gulp.src(config.vendor.bundle)
		.pipe(sourcemaps.init())
		.pipe(concat(config.vendor.dstFileName))
		.pipe(uglify())
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest(config.vendor.dst));
});