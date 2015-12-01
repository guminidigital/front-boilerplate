'use strict';

var gulp = require("gulp");
var config = require('../config');
var nunjucksRender = require('gulp-nunjucks-render');
var prettify = require('gulp-html-prettify');
var handleErrors = require('../utils/handleErrors');
var browserSync = require("browser-sync");
var minifyHTML = require('gulp-minify-html');
var gulpif = require('gulp-if');


function htmlNunjucksRun(watch, minify) {
	// Configura o ambiente do nunjucks
	nunjucksRender.nunjucks.configure([config.html.baseRender], { watch: watch });

	gulp.src(config.html.src)
		.pipe(nunjucksRender().on('error', handleErrors))
		.pipe( gulpif(!minify, prettify({
			indent_char: '	',
			indent_size: 1
		})) )
		.pipe( gulpif( minify, minifyHTML() ) )
		.pipe(gulp.dest(config.html.dst))
		.pipe(browserSync.reload({stream: true}));
}


gulp.task('html-nunjucks', function() {
	htmlNunjucksRun(false, false);
});


gulp.task('html-nunjucks-watch', function() {
	htmlNunjucksRun(true, false);
});


gulp.task('html-build-nunjucks', function() {
	htmlNunjucksRun(false, config.html.minifyDistHtml);
});
