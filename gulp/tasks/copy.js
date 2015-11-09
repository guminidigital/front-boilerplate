'use strict';

var gulp = require("gulp");
var config = require('../config');

gulp.task('copy', function() {
	for(var x=0; x<config.copy.actions.length; x++) {
		var action = config.copy.actions[x];
		gulp.src(action.src)
			.pipe(gulp.dest(action.dst));		
	}

	return false;
	
});