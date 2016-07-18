'use strict';

var gulp = require("gulp");
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var config = require('../config');
var handleErrors = require('../utils/handleErrors');
var browserSync = require("browser-sync");
var minifyCSS = require('gulp-minify-css');
var plumber = require('gulp-plumber');


gulp.task('css', function() {
	gulp.src(config.css.src)
		.pipe(plumber())
		.pipe(sourcemaps.init())
		.pipe(sass().on('error', handleErrors))
		.pipe(autoprefixer({browsers: ["> 5% in BR", "ie >= 9", "not ie < 9", "iOS 7"]}))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest(config.css.dst))
		.pipe(browserSync.reload({stream: true}));
});

gulp.task('css-build', function() {
	gulp.src(config.css.src)
		.pipe(plumber())
		.pipe(sass().on('error', handleErrors))
		.pipe(autoprefixer({browsers: ["> 5% in BR", "ie >= 9", "not ie < 9"]}))
		.pipe(minifyCSS())
		.pipe(gulp.dest(config.css.dst))
});
