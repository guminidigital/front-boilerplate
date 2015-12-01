'use strict';

var gulp = require('gulp');
var spritesmith = require('gulp.spritesmith');
var fs = require('fs');
var path = require('path');
var config = require('../config');


// Retorna um array com o nome das pastas do diretório passado.
function getFolders(dir) {
    return fs.readdirSync(dir)
		.filter(function(file) {
			return fs.statSync(path.join(dir, file)).isDirectory();
	});
};


function loadSprites(pathSprite){
	var spriteData = gulp.src(config.sprites.src + '/' + pathSprite + '/*.png').pipe(spritesmith({
		imgName: pathSprite + '.png',
		cssName: pathSprite + '.less',
		imgPath: config.sprites.dst,
		cssFormat: 'less',
		algorithm: 'binary-tree',
		padding: 5
	}))

	spriteData.img.pipe(gulp.dest(config.sprites.dst));
	spriteData.css.pipe(gulp.dest(config.sprites.css));
};


gulp.task('sprites', function() {
	var folders = getFolders(config.sprites.src);
	var totalFolders = folders.length;

	for(var i = 0; i < totalFolders; i+=1){
		loadSprites(folders[i]);
	}
});