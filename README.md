# Front Boilerplate

## Iniciando
- Faça [download](https://github.com/guminidigital/front-boilerplate/releases) ou clone o repositório
- `npm install`
- `gulp` para inicializar
- Entre em http://localhost:3000

(Se clonar, não esqueça de remover a pasta git antes de iniciar outro projeto: `rm -rf .git`)

## O que vem no pacote?
- Nunjucks
- Browserify
- SASS
- Browsersync
- Gulp

## Estutura do src/
| Pasta                         | Descrição                                                                                       |
|-------------------------------|-------------------------------------------------------------------------------------------------|
| src                           | Source do projeto, representa a raiz do projeto na pasta dist                                   |
| src/css                       | Arquivos SASS                                                                                   |
| src/css/inc                   | Arquivos de include do SASS que não são compilados nem copiados para `dist`                     |
| _src/css/inc/sprites_         | Arquivos gerados pela task de sprites no GULP. Não é _trackeado_ pelo git.                      |
| src/files/*                   | Arquivos estáticos que são copiados diretamente para dist, sem tratamento. Ex.: fontes e vídeos |
| src/html-parts/               | Includes e extends do nunjucks                                                                  |
| src/images/                   | Arquivos de imagens                                                                             |
| src/images/sprites/\*\*/*.png | Arquivos PNG soltos para gerar o sprite pelo GULP                                               |
| src/scripts/                  | Arquivos JS                                                                                     |
| src/scripts/inc               | Arquivos de include (require) do javascript. Não são compilados nem copiados para `dist`.       |
| src/vendor                    | Pasta que contem as libs instaladas pelo Bower                                                  |
| src/vendor/downloaded         | Pasta que contem libs baixadas, que não fazem parte do Bower                                    |


## Vendor e o vendor.json
Em src/vendor está o arquivo vendor.json. Nele é declarado os bundles de libs que vão ser compilados pelo GULP. Cada arquivo deve ser declarado no array relativo à pasta vendor

```JSON
{
	"vendor.js": [
		"jquery/jquery.min.js",
		"downloaded/lib/lib.min.js"
	],

	"outro-vendor.js": [
		"jquery/jquery.min.js",
		"jqueryui/jqueryui.min.js",
		"downloaded/lib/lib.min.js"
	],
}
```

## Sprites
Os sprites são gerados automaticamente pelo GULP, com o [gulp.spritesmith](https://github.com/twolfson/gulp.spritesmith), ao criar pastas dentro de src/images/sprites/{nome-do-sprite}/*.png. Isso irá unificar todos os arquivos que estiverem dentro desta pasta em dist/images/sprites/{nome-do-sprite}.png.

O GULP também gera aquivos .sass em src/css/inc/sprites/{nome-do-sprite}.scss, que contém as variáveis de uso do sprite e alguns mixins para facilitar a utilização do sprite. Tanto os mixins, quanto as variáveis tem o prefixo _s-{nome-do-sprite}_:

- Mixins: .s-{nome-do-sprite}-sprite($sprite)
- Variáveis: $s-{nome-do-sprite}-{nome-do-icone}

### Utilização
No arquivo sass, chamar o mixin .s-{nome-do-sprite}-sprite passando a variável $s-{nome-do-sprite}-{nome-do-icone}. Ex.: Sprite da home, pegando o logo: 

``` css
.logo {
	display: block;
	position: absolute;
	top: 10px;
	left: 10px;
	@include s-home-sprite($s-home-logo);
}
```

A saída no CSS fica

```css
.logo {
	display: block;
	position: absolute;
	top: 10px;
	left: 10px;
	background-image: url(../images/sprites/home.png);
	background-position: -124px -12px;
	width: 120px;
	height: 40px;
}
```

## Nunjucks
Todo arquivo HTML que esteja na raiz ou em qualquer outra sub-pasta (que não sejam as padrões listadas acima), serão compilados pelo nunjucks e copiados na mesma estrutura para /dist. A pasta /src/html-parts é destinada a colocar arquivos para include e extend do Nunjucks

## Scripts e Browserify
Cada arquivo na raiz de /src/scripts é compilado pelo Browserify e copiado com mesmo nome para a pasta /dist/scripts. Os arquivos em /src/scripts/inc não são nem compilados nem copiados. Servem como uma pasta para manter os módulos usados para `require`.

## CSS e Sass
Todos os arquivos do sass compilados estarão em /src/css. Arquivos dentro de /src/css/inc não são compilados nem copiados para a pasta /dist/. Idealmente, os arquivos em /src/css somente devem ter declarações `@import` para arquivos que estejam em /src/css/inc

## Build
`gulp build` gera a pasta ./dist/