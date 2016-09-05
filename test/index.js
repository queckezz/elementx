
global.document = require('jsdom').jsdom('<body></body>')
global.window = document.defaultView
global.navigator = window.navigator

const { input, button, div, h1, p, h } = require('..')
const decorate = require('../decorate')
const tsml = require('tsml')
const test = require('tape')

test('create nodes', (t) => {
  t.equal(h('h1').outerHTML, '<h1></h1>', 'empty element')
  t.equal(
    h('h1', 'hello world').outerHTML,
    '<h1>hello world</h1>',
    'text node'
  )
  t.end()
})

test('id and class shorthands', (t) => {
  t.equal(
    h('h1.title.bold', 'text').outerHTML,
    '<h1 class="title bold">text</h1>',
    'class'
  )

  t.equal(
    h('h1#some-id', 'text').outerHTML,
    '<h1 id="some-id">text</h1>',
    'id'
  )

  t.end()
})

test('create nested nodes', (t) => {
  const tree = h('div', [
    h('h1', 'Title'),
    h('p', 'Paragraph')
  ])

  t.equal(tree.outerHTML, '<div><h1>Title</h1><p>Paragraph</p></div>')
  t.end()
})

test('create node with attributes', (t) => {
  const node = h('div', { class: 'test', 'data-id': 2 })
  t.equal(node.getAttribute('class'), 'test', 'reserved keywords')
  t.equal(node.getAttribute('data-id'), '2', 'data attributes')
  t.equal(node.outerHTML, '<div class="test" data-id="2"></div>')
  t.end()
})

test('create nested nodes with all different kinds of combinations', (t) => {
  const tree = h('div', { class: 'full-width p2' }, [
    h('h1', 'Some text'),
    h('div', { style: 'background-color: red;' }, [
      h('a', { href: 'http://github.com' }, 'Github')
    ])
  ])

  t.equal(tree.outerHTML, tsml`
    <div class="full-width p2">
      <h1>Some text</h1>
      <div style="background-color: red;">
        <a href="http://github.com">Github</a>
      </div>
    </div>
  `)

  t.end()
})

test('hyperscript helpers', (t) => {
  const tree = div({ id: 'js-root' }, [
    h1('.title', 'Hello World!'),
    p('This is a description'),
    button('Click!')
  ])

  t.equal(tree.outerHTML, tsml`
    <div id="js-root">
      <h1 class="title">Hello World!</h1>
      <p>This is a description</p>
      <button>Click!</button>
    </div>
  `)

  t.end()
})

test('supports boolean attributes', (t) => {
  const tree = input({
    type: 'checkbox',
    autofocus: true,
    checked: false
  })

  t.equal(tree.outerHTML, tsml`
    <input type="checkbox" autofocus="autofocus">
  `)

  t.end()
})

test('supports className as an alias for class', (t) => {
  const node = p({ className: 'test-class' })
  t.equal(node.outerHTML, '<p class="test-class"></p>')
  t.end()
})

test('decorate', (t) => {
  const { span } = decorate((attr, value) => {
    if (attr == 'class') {
      return 'DECORATED'
    }
  })

  const node = span({ class: 'hello world' })
  t.equal(node.outerHTML, '<span class="DECORATED"></span>')
  t.end()
})

test('ignore null as children', (t) => {
  const node1 = div([p('hello'), null])
  const node2 = div([null])
  const node3 = div([undefined])
  const node4 = div([undefined, null, p('hello')])

  t.equal(node1.outerHTML, '<div><p>hello</p></div>')
  t.equal(node2.outerHTML, '<div></div>')
  t.equal(node3.outerHTML, '<div></div>')
  t.equal(node4.outerHTML, '<div><p>hello</p></div>')
  t.end()
})
