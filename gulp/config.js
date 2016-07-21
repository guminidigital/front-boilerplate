'use strict';

var src = './src';
var dst = './dist';

module.exports = {
	/**
	 * base
	 * Configurações basicas para qualquer task
	 *
	 * src: Pasta base do source (sempre usar a variavel global src)
	 * dst: Pasta base do destino (sempre usar a variavel global dst)
	 * tasks: Arrays das tasks do default.js que devem ser rodadas no Gulp
	 */
	base: {
		src: src,
		dst: dst,

		tasks: {
			default: [
				'images',
				'sprites',
				'copy',
				'html-nunjucks',
				'css',
				'scripts-browserify',
				'vendor',
				'watch'
			],

			build: [
				'images-build',
				'sprites-build',
				'copy-build',
				'html-build-nunjucks',
				'css-build',
				'scripts-build-browserify',
				'vendor-build'
			]
		}
	},


	/**
	 * copy
	 * Configurações referentes aos arqivos que é só copiar do src para o dst
	 *
	 * watch: Arquivos que devem ser monitorados
	 * actions[].src: Sources dos arquivos
	 * actions[].dst: Destino dos arquivos
	 */
	copy: {
		watch: [src+'/files/**/*.*', '!'+src+'/files/**/empty.txt', '!'+src+'/files/**/.DS_Store', '!'+src+'/files/images/**/*.*'],
		actions: [{
			src: [src+'/files/**/*.*', '!'+src+'/files/**/empty.txt', '!'+src+'/files/**/.DS_Store', '!'+src+'/files/images/**/*.*'],
			dst: dst+'/files',
			dstDel: [dst+'/files/**/*.*', '!'+dst+'/files/images/**/*.*']
		}]
	},


	/**
	 * sass
	 * Configurações relativas ao sass
	 *
	 * src: Sources dos arquivos
	 * watch: Arquivos que devem ser monitorados
	 * dst: Destino dos arquivos
	 */
	css: {
		src: [src+'/css/**/*.scss', '!'+src+'/css/inc/**/*'],
		watch: src+'/css/**/*.scss',
		dst: dst+'/css'
	},


	/**
	 * scripts
	 * Configurações relativas à scripts e browserify
	 *
	 * src: Sources dos arquivos
	 * watch: Arquivos que devem ser monitorados
	 * dst: Destino dos arquivos
	 * browserify.bundles: Lista de cada arquivo inicial que deve ser compilado
	 */
	scripts: {
		srcPath: src+'/scripts',
		src: src+'/scripts/**/*.js',
		watch: src+'/scripts/**/*.js',
		dst: dst+'/scripts',
		dstEs5: dst+'/scripts/es5'
	},


	/**
	 * vendor
	 * Configurações relativas ao scripts do vendor
	 *
	 * bundle: Sources dos arquivos
	 * dst: Destino dos arquivos
	 * dstFileName: Nome do arquivo no destino
	 */
	vendor: {
		watch: src+'/vendor/vendor.json',
		dst: dst+'/vendor',
		src: src+'/vendor'
	},


	/**
	 * images
	 * Configurações relativas a task images
	 *
	 * src: Sources dos arquivos
	 * watch: Arquivos que devem ser monitorados
	 * dst: Destino dos arquivos
	 */
	images: {
		src: [src+'/images/**/*.*', '!'+src+'/images/sprites/**/*.*'],
		watch: [src+'/images/**/*.*', '!'+src+'/images/sprites/**/*.*'],
		dst: dst+'/images'
	},


	/**
	 * sprites
	 * Configurações relativas a task sprites
	 *
	 * src: Sources dos arquivos
	 * css: Arquivos que vão conter todas as variaveis relacionadas com cada sprite
	 * watch: Arquivos que devem ser monitorados
	 * dst: Destino dos arquivos
	 */
	sprites: {
		src: src+'/images/sprites',
		css: src+'/css/inc/sprites',
		watch: src+'/images/sprites/**/*.*',
		dst: dst+'/images/sprites',
		dstRelative: '../images/sprites'
	},


	/**
	 * html
	 * Configurações relativas a task do html
	 *
	 * baseRender: Configuração do nunjucks-render para determinar a base dos templates
	 * src: Sources dos arquivos
	 * watch: Arquivos que devem ser monitorados
	 * dst: Destino dos arquivos
	 */
	html: {
		baseRender: src+'/',
		src: [src+'/**/*.html', '!'+src+'/html-parts/**/*', '!'+src+'/files/**/*', '!'+src+'/scripts/**/*', '!'+src+'/css/**/*', '!'+src+'/vendor/**/*'],
		watch: src+'/**/*.html',
		dst: dst,
		minifyDistHtml: false
	},


	/**
	 * browserSync
	 * Configurações do browser sync
	 * @link http://www.browsersync.io/
	 *
	 * conf: Objeto de configurações direto do Browser Sync
	 */
	 browserSync: {
		conf: {
			open: false,
			server: {
				baseDir: dst
			}
		}
	}
}
