# Front Boilerplate

## Iniciando
- Faça download ou clone o repositório
- `npm install`
- `gulp` para inicializar
- Entre em http://localhost:3000

(Se clonar, não esqueça de remover a pasta git antes de iniciar outro projeto: `rm -rf .git`)

## O que vem no pacote?
- Nunjucks
- Browserify
- Less
- Browsersync
- Gulp

## Estutura do src/
| Pasta                 | Descrição                                                                                       |
|-----------------------|-------------------------------------------------------------------------------------------------|
| src                   | Source do projeto, representa a raiz do projeto na pasta dist                                   |
| src/css               | Arquivos LESS                                                                                   |
| src/css/inc           | Arquivos de include do LESS que não são compilados nem copiados para `dist`                     |
| src/files/*           | Arquivos estáticos que são copiados diretamente para dist, sem tratamento. Ex.: fontes e vídeos |
| src/images/           | Arquivos de imagens                                                                             |
| src/html-parts/       | Includes e extends do nunjucks                                                                  |
| src/scripts/          | Arquivos JS                                                                                     |
| src/scripts/inc       | Arquivos de include (require) do javascript. Não são compilados nem copiados para `dist`.       |
| src/vendor            | Pasta que contem as libs instaladas pelo Bower                                                  |
| src/vendor/downloaded | Pasta que contem libs baixadas, que não fazem parte do Bower                                    |


## Vendor e o vendor.json
Em src/vendor está o arquivo vendor.json. Nele é declarado os bundles de libs que vão ser compilados pelo GULP. Cada arquivo deve ser declarado no array relativo à pasta vendor

```JSON
{
	"vendor.js": [
		'jquery/jquery.min.js',
		'downloaded/lib/lib.min.js'
	],

	"outro-vendor.js": [
		'jquery/jquery.min.js',
		'jqueryui/jqueryui.min.js',
		'downloaded/lib/lib.min.js'
	],
}
```

## Nunjucks
Todo arquivo HTML que esteja na raiz ou em qualquer outra sub-pasta (que não sejam as padrões listadas acima), serão compilados pelo nunjucks e copiados na mesma estrutura para /dist. A pasta /src/html-parts é destinada a colocar arquivos para include e extend do Nunjucks

## Scripts e Browserify
Cada arquivo na raiz de /src/scripts é compilado pelo Browserify e copiado com mesmo nome para a pasta /dist/scripts. Os arquivos em /src/scripts/inc não são nem compilados nem copiados. Servem como uma pasta para manter os módulos usados para `require`.

## CSS e Less
Todos os arquivos do less compilados estarão em /src/css. Arquivos dentro de /src/css/inc não são compilados nem copiados para a pasta /dist/. Idealmente, os arquivos em /src/css somente devem ter declarações `@import` para arquivos que estejam em /src/css/inc
