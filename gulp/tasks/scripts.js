'use strict';

var gulp = require("gulp");
var babel = require('gulp-babel');
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
var del = require('del');


function scriptsDoBrowserify(buildMode) {
	var files = fs.readdirSync(config.scripts.srcPath);
	for(var x=0; x<files.length; x++) {
		if(path.extname(files[x])!='.js') continue;

		var src = config.scripts.dstEs5 + '/' + files[x];
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


gulp.task('clean-es5', function(){
  return del(config.scripts.dstEs5);
});


gulp.task('es6-commonjs', ['clean-es5'], function(){
  return gulp.src(config.scripts.srcPath + '/**/*.js')
    .pipe(babel()).on('error', handleErrors)
    .pipe(gulp.dest(config.scripts.dstEs5));
});


gulp.task('scripts-browserify',['es6-commonjs'], function() {
	scriptsDoBrowserify(false);
});


gulp.task('scripts-build-browserify', function() {
	scriptsDoBrowserify(true);
});
