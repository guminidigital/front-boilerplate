'use strict';

var gulp = require("gulp");
var config = require('../config');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var handleErrors = require('../utils/handleErrors');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var browserSync = require("browser-sync");
var fs = require("fs");
var path = require('path');
var gulpif = require('gulp-if');
var shell = require('gulp-shell');


function scriptsDoBrowserify(buildMode) {
	var files = fs.readdirSync(config.scripts.srcPath);
	for(var x=0; x<files.length; x++) {
		if(path.extname(files[x])!='.js') continue;

		var src = config.scripts.srcPath + '/' + files[x];
		var arrPath = src.split('/');

		browserify(src)
			.bundle().on('error', handleErrors)
			.pipe(source(arrPath[arrPath.length-1]))
			.pipe(buffer()) // Para funcionar o uglify (http://bit.ly/1OtEyhq)
			.pipe( gulpif( buildMode, uglify() ) ) // Se for modo de build
			.pipe(gulp.dest(config.scripts.dst))
			.pipe(gulpif(!buildMode,browserSync.reload({stream: true}))); // Se não for modo de build
	}
}


gulp.task('scripts-browserify', function() {
	scriptsDoBrowserify(false);
});


gulp.task('scripts-build-browserify', function() {
	scriptsDoBrowserify(true);
});


gulp.task('scripts-documentation', shell.task(['./node_modules/jsdoc/jsdoc.js ' + config.scripts.srcPath + ' -d ' + config.scripts.docs + ' -r'], {verbose: true}));
