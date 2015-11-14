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
			default: ['images', 'copy', 'nunjucks', 'less', 'scripts-browserify', 'vendor', 'watch'],
			build: ['clean-dist', 'copy', 'nunjucks', 'less', 'scripts-browserify', 'images', 'vendor']			
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
		watch: [src+'/files/**/*.*', '!'+src+'/files/**/.DS_Store', '!'+src+'/files/images/**/*.*'],
		actions: [{
			src: [src+'/files/**/*.*', '!'+src+'/files/**/.DS_Store', '!'+src+'/files/images/**/*.*'],
			dst: dst+'/files',
			dstDel: [dst+'/files/**/*.*', '!'+dst+'/files/images/**/*.*']
		}]
	},


	/**
	 * less
	 * Configurações relativas ao less
	 *
	 * src: Sources dos arquivos
	 * watch: Arquivos que devem ser monitorados
	 * dst: Destino dos arquivos
	 */
	less: {
		src: [src+'/css/**/*.less', '!'+src+'/css/**/inc/*'],
		watch: src+'/css/**/*.less',
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
		src: src+'/scripts/**/*.js',
		watch: src+'/scripts/**/*.js',
		dst: dst+'/scripts',

		browserify: {
			bundles: [
				src+'/scripts/main.js'
			]
		}
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
		src: src+'/files/images/**/*.*',
		watch: src+'/files/images/**/*.*',
		dst: dst+'/files/images'
	},


	/**
	 * nunjucks
	 * Configurações relativas a task do nunjucks
	 *
	 * baseRender: Configuração do nunjucks-render para determinar a base dos templates
	 * src: Sources dos arquivos
	 * watch: Arquivos que devem ser monitorados
	 * dst: Destino dos arquivos
	 */
	nunjucks: {
		baseRender: src+'/html',
		src: [src+'/html/**/*.html', '!'+src+'/html/templates/**/*'],
		watch: src+'/html/**/*.html',
		dst: dst
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
