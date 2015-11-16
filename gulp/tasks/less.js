'use strict';

var gulp = require("gulp");
var less = require("gulp-less");
var sourcemaps = require('gulp-sourcemaps');
var LessPluginAutoPrefix = require('less-plugin-autoprefix');
var autoprefix = new LessPluginAutoPrefix({browsers: ["> 5% in BR", "ie >= 9", "not ie < 9"]});
var config = require('../config');
var handleErrors = require('../utils/handleErrors');
var browserSync = require("browser-sync");


gulp.task('less', function() {
	gulp.src(config.less.src)
		.pipe(sourcemaps.init())
		.pipe(less({
			plugins: [autoprefix]
		}).on('error', handleErrors))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest(config.less.dst))
		.pipe(browserSync.reload({stream: true}));
});


gulp.task('less-dist', function() {
	gulp.src(config.less.src)
		.pipe(less({outputStyle: 'compressed'}).on('error', handleErrors))
		.pipe(gulp.dest(config.less.dst));
});