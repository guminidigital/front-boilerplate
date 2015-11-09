'use strict';

var gulp = require("gulp");
var config = require("../config");

gulp.task('default', config.base.tasks.default, function() {
	console.log("All done!");
});

gulp.task('build', config.base.tasks.build, function() {
	console.log("All done!");
});