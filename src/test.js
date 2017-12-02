'use strict'

const test = require('tap').test
const rehype = require('rehype')
const unified = require('unified')
const remarkParse = require('remark-parse')
const remarkRehype = require('remark-rehype')
const rehypeStringify = require('rehype-stringify')
const wrap = require('./')

const markdown = `
# Foo

\`\`\`js
const foo = 'bar'
\`\`\`
`

const process = (plugin, options, markdown) => {
  return unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(plugin, options)
    .use(rehypeStringify)
    .processSync(markdown)
}

test('rehype-wrap', t => {
  let vfile

  t.test('should throw', it => {
    it.throws(() => {
      vfile = process(wrap, null, markdown)
    }, /Expected a `string` as wrapper/,
    ' if no options are given')

    it.throws(() => {
      vfile = process(wrap, {wrap: 'a', select: 1}, markdown)
    }, /Expected a `string` as selector/,
    ' if selector is not a string')
    it.end()
  })

  t.test('should not throw', it => {
    it.doesNotThrow(() => {
      vfile = process(wrap, {wrap: 'div'}, markdown)

      it.ok(vfile.toString().length > 0, 'should process')
      it.ok(vfile.toString() === [
        '<div><h1>Foo</h1>',
        '<pre><code class="language-js">const foo = \'bar\'',
        '</code></pre></div>'
      ].join('\n'),
        'should be equal wrap div'
      )

      vfile = unified()
        .use(remarkParse)
        .use(remarkRehype)
        .use(rehypeStringify)
        .processSync(markdown)
        .toString()

      const vfileWithBody = rehype()
        .use(wrap, {wrap: 'div'})
        .processSync(vfile)
        .toString()

      it.ok(vfileWithBody === [
        '<html><head></head><body><div><h1>Foo</h1>',
        '<pre><code class="language-js">const foo = \'bar\'',
        '</code></pre></div></body></html>'
      ].join('\n'),
      'should be equal wrap div with body'
      )

      vfile = process(wrap, {
        select: 'pre',
        wrap: 'div'
      }, markdown)

      it.ok(vfile.toString() === [
        '<h1>Foo</h1>',
        '<div><pre><code class="language-js">const foo = \'bar\'',
        '</code></pre></div>'
      ].join('\n'),
        'should match with wrap dive and selector pre'
      )

      const ast = unified()
        .use(remarkParse)
        .use(remarkRehype)
        .use(wrap, {wrap: 'div'})
        .parse('<h1>foo</h1>')

      t.ok(vfile, ast.type)
    })
    it.end()
  })
  t.end()
})
