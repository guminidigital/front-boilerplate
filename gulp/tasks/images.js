'use strict';

var gulp = require("gulp");
var config = require('../config');
var imagemin = require('gulp-imagemin');
var del = require('del');

gulp.task('images', function() {
	del(config.images.dst).then(function() {
		gulp.src(config.images.src)
			.pipe(imagemin())
			.pipe(gulp.dest(config.images.dst));	
	});
});