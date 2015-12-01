'use strict';

var gulp = require("gulp");
var config = require('../config');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var fs = require('fs');
var del = require('del');

gulp.task('vendor', function() {
	var vendorJson = JSON.parse(fs.readFileSync(config.base.src + '/vendor/vendor.json'));

	del.sync(config.vendor.dst);

	for(var file in vendorJson) {

		// Normaliza os caminhos
		for(var x=0; x<vendorJson[file].length; x++)
			vendorJson[file][x] = config.vendor.src+'/'+vendorJson[file][x];

		gulp.src(vendorJson[file])
			.pipe(concat(file))
			.pipe(gulp.dest(config.vendor.dst));
	}
});


gulp.task('vendor-build', ['vendor']);
