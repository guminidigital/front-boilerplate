'use strict';

var gulp = require("gulp");
var config = require('../config');
var nunjucksRender = require('gulp-nunjucks-render');
var prettify = require('gulp-html-prettify');
var handleErrors = require('../utils/handleErrors');
var browserSync = require("browser-sync");


function htmlNunjucksRun(watch) {
	// Configura o ambiente do nunjucks
	nunjucksRender.nunjucks.configure([config.html.baseRender], { watch: watch });

	gulp.src(config.html.src)
		.pipe(nunjucksRender().on('error', handleErrors))
		.pipe(prettify({
			indent_char: '	',
			indent_size: 1
		}))
		.pipe(gulp.dest(config.html.dst))
		.pipe(browserSync.reload({stream: true}));
}


gulp.task('html-nunjucks', function() {
	htmlNunjucksRun(false);
});


gulp.task('html-nunjucks-watch', function() {
	htmlNunjucksRun(true);
});
