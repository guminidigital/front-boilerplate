'use strict';

var gulp = require("gulp");
var config = require('../config');
var nunjucksRender = require('gulp-nunjucks-render');
var prettify = require('gulp-html-prettify');
var handleErrors = require('../utils/handleErrors');
var browserSync = require("browser-sync");


function nunjucksRun(watch) {
	// Configura o ambiente do nunjucks
	nunjucksRender.nunjucks.configure([config.nunjucks.baseRender], { watch: watch });
	
	gulp.src(config.nunjucks.src)
		.pipe(nunjucksRender().on('error', handleErrors))
		.pipe(prettify({
			indent_char: '	',
			indent_size: 1
		}))
		.pipe(gulp.dest(config.nunjucks.dst))
		.pipe(browserSync.reload({stream: true}));
}


gulp.task('nunjucks', function() {
	nunjucksRun(false);
});


gulp.task('nunjucks-watch', function() {
	nunjucksRun(true);
});