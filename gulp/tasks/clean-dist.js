'use strict';

var gulp = require("gulp");
var config = require('../config');
var del = require("del");

gulp.task('clean-dist', function() {
	del.sync(config.base.dst);
});