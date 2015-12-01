'use strict';

var gulp = require("gulp");
var config = require("../config");
var browserSync = require("browser-sync");

gulp.task('default', ['clean-dist'], function() {
	console.log("Dist is clean");
	gulp.start("default-run");
});

gulp.task('default-run', config.base.tasks.default, function() {
	// Inicializa o browser sync
	console.log("Inicializando o browser-sync");
	browserSync.init(config.browserSync.conf);
});

gulp.task('build', ['clean-dist'], function() {
	console.log("Dist is clean");
	gulp.start("build-run");
});

gulp.task('build-run', config.base.tasks.build, function() {});
