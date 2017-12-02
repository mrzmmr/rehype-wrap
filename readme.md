# rehype-wrap

> Wrap selected elements with a given element

[![Travis](https://img.shields.io/travis/mrzmmr/rehype-wrap.svg)](https://travis-ci.org/mrzmmr/rehype-wrap)
[![Coverage Status](https://coveralls.io/repos/github/mrzmmr/rehype-wrap/badge.svg?branch=master)](https://coveralls.io/github/mrzmmr/rehype-wrap?branch=master)
[![David](https://img.shields.io/david/mrzmmr/rehype-wrap.svg)](https://david-dm.org/mrzmmr/rehype-wrap)

## Install

```sh
npm i -S rehype-wrap
```

## Usage

```js
const wrap = require('rehype-wrap')
const rehype = require('rehype')

rehype()
  .use(wrap, {/* options */})
  .process(/* html string */)
  .then(/* vfile */)
  .catch(/* handle any errors */)
```

## Options

### `wrap.selector`
#### `string`

Select an element to be wrapped. Expects a string selector that can be passed to hast-util-select ([supported selectors](https://github.com/syntax-tree/hast-util-select/blob/master/readme.md#support)). If `wrap.selector` is not set then wrap will check for a `body` element and wrap all elements inside. Otherwise, if there is no `body` element, wrap treats the html as a fragment and wraps everything.

### `wrap.wrapper`</h3>
#### `string`

Element to wrap around *`wrap.selector`*. Expects a string *`selector`* that can be parsed into html using hast-util-parse-selector ([see readme](https://github.com/syntax-tree/hast-util-parse-selector/blob/master/readme.md))

## Example

```sh
# dependencies

npm i unified to-vfile remark-parse remark-rehype vfile-reporter rehype-document rehype-stringify remark-wrap
```

````md
# example.md

```js
const foo = 'bar'
```
````

```js
/* example.js */

'use strict'

const unified = require('unified')
const toVfile = require('to-vfile')
const remarkParse = require('remark-parse')
const remarkRehype = require('remark-rehype')
const vfileReporter = require('vfile-reporter')
const rehypeDocument = require('rehype-document')
const rehypeStringify = require('rehype-stringify')
const rehypeWrap = require('rehype-wrap')

const markdown = toVfile.readSync('./example.md')


unified()
  .use(remarkParse)
  .use(remarkRehype)
  .use(rehypeDocument)
  .use(rehypeWrap, {wrapper: 'div.markdown-body'})
  .use(rehypeStringify)
  .process(markdown, (err, file) => {
    console.error(vfileReporter(err ||file))
    console.log(String(file))
  })
```

```html
<!— output —>

<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
</head>
<body><div class="markdown-body">
<h1>Foo</h1>
<pre><code class="language-js">const foo = 'bar'
</code></pre>
</div></body>
</html>

```


## Acknowledgments

Rehype-wrap depends on a few great packages you should check out. 

- [hast-util-parse-selector](https://github.com/syntax-tree/hast-util-parse-selector) - used to parse a selector into an element. 
- [hast-util-select](https://github.com/syntax-tree/hast-util-select) - used to select an element to wrap. 
- [unist-util-visit](https://github.com/syntax-tree/unist-util-visit) - used to visit elements and their parent element.

## License

MIT &copy; Paul Zimmer
