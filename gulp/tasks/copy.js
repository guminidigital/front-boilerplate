'use strict';

var gulp = require("gulp");
var config = require('../config');
var del = require("del");
var browserSync = require("browser-sync");
var _timeoutBSReload = null;


gulp.task('copy-do', function() {
	for(var x=0; x<config.copy.actions.length; x++) {
		var action = config.copy.actions[x];
		gulp.src(action.src)
			.pipe(gulp.dest(action.dst))
	}
});


gulp.task('clean-copy-folder', function() {
	for(var x=0; x<config.copy.actions.length; x++) {
		var action = config.copy.actions[x];
		del.sync(action.dstDel);
	}
});


gulp.task('copy', ['copy-do'], function() {
	clearTimeout(_timeoutBSReload);
	_timeoutBSReload = setTimeout(function() {
		browserSync.reload();
	}, 2000);

});


gulp.task('copy-clean', ['clean-copy-folder'], function() {
	gulp.start("copy")
});

gulp.task('copy-build', ['copy-do']);
