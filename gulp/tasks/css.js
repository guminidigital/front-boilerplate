'use strict';

var gulp = require("gulp");
var less = require("gulp-less");
var sourcemaps = require('gulp-sourcemaps');
var LessPluginAutoPrefix = require('less-plugin-autoprefix');
var autoprefix = new LessPluginAutoPrefix({browsers: ["> 5% in BR", "ie >= 9", "not ie < 9"]});
var config = require('../config');
var handleErrors = require('../utils/handleErrors');
var browserSync = require("browser-sync");
var minifyCSS = require('gulp-minify-css');
var plumber = require('gulp-plumber');


gulp.task('css', function() {
	gulp.src(config.css.src)
		.pipe(plumber())
		.pipe(sourcemaps.init())
		.pipe(less({
			plugins: [autoprefix]
		}).on('error', handleErrors))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest(config.css.dst))
		.pipe(browserSync.reload({stream: true}));
});

gulp.task('css-build', function() {
	gulp.src(config.css.src)
		.pipe(plumber())
		.pipe(less({
			plugins: [autoprefix]
		}).on('error', handleErrors))
		.pipe(minifyCSS())
		.pipe(gulp.dest(config.css.dst))
});
