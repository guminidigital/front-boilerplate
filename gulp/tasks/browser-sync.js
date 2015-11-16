'use strict';

var gulp = require("gulp");
var config = require('../config');
var browserSync = require("browser-sync");

gulp.task('browser-sync', function() {
	browserSync.init(config.browserSync.conf);
});