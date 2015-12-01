'use strict';

var _watchImagesShouldClean, _watchImagesTimeout, _watchCopyShouldClean, _watchCopyTimeout;


var gulp = require("gulp");
var config = require('../config');
var watch = require("gulp-watch");
var browserSync = require("browser-sync");
var fs = require("fs");

gulp.task('watch', function() {
	// SASS
	watch(config.css.watch, function() {
		gulp.start("css");
	});

	// SCRIPTS
	watch(config.scripts.watch, function() {
		gulp.start("scripts-browserify");
	});

	// IMAGES
	watch(config.images.watch, function(e) {
		clearTimeout(_watchImagesTimeout);
		if(!fs.existsSync(e.path)) _watchImagesShouldClean = true;

		// Evita o acumulo de cópias que pode travar o GULP
		_watchImagesTimeout = setTimeout(function() {
			var acao = _watchImagesShouldClean===true ? "images-clean" : "images";
			gulp.start(acao);
			_watchImagesShouldClean = false;
		}, 500);
	});

	// SPRITES
	watch(config.sprites.watch, function(){
		gulp.start("sprites");
	});


	// NUNJUCKS
	watch(config.html.watch, function() {
		gulp.start("html-nunjucks-watch");
	});


	// NUNJUCKS
	watch(config.vendor.watch, function() {
		gulp.start("vendor");
	});


	// COPY STATIC FILES
	watch(config.copy.watch, function(e) {
		clearTimeout(_watchCopyTimeout);
		if(!fs.existsSync(e.path)) _watchCopyShouldClean = true;

		// Evita o acumulo de cópias que pode travar o GULP
		_watchCopyTimeout = setTimeout(function() {
			var acao = _watchCopyShouldClean===true ? "copy-clean" : "copy";
			gulp.start(acao);
			_watchCopyShouldClean = false;
		}, 500);
	});
});
