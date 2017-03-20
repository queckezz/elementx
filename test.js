
const serialize = require('serialize-dom')
const createElement = require('./')
const tsml = require('tsml')
const test = require('ava')

test('tag', (t) => {
  const actual = createElement('h1')
  const expected = '<h1></h1>'
  t.is(serialize(actual), expected)
})

test('attributes', (t) => {
  const actual = createElement('h1', {
    id: 'header',
    class: 'big'
  })

  const expected = '<h1 id="header" class="big"></h1>'
  t.is(serialize(actual), expected)
})

test('boolean attributes', (t) => {
  const actual = createElement('input', {
    type: 'checkbox',
    autofocus: true,
    checked: false
  })

  const expected = tsml`
    <input type="checkbox" autofocus="autofocus">
  `

  t.is(serialize(actual), expected)
})

test('svg attributes', (t) => {
  const node = createElement('use', {
    'xlink:href': '#test'
  })

  t.is(node.attributes[0].ns, 'http://www.w3.org/1999/xlink')
})

test('unknown namespace attributes', (t) => {
  const node = createElement('use', {
    'randomnamespace:href': '#test'
  })

  t.is(node.attributes[0].ns, null)
})

test('children', (t) => {
  const actual = createElement('div',
    createElement('p'),
    createElement('p')
  )

  const expected = tsml`
    <div>
      <p></p>
      <p></p>
    </div>
  `

  t.is(serialize(actual), expected)
})

test('children as a falsy value', (t) => {
  const actual = createElement('div',
    undefined,
    null,
    createElement('p', 'hello')
  )

  const expected = tsml`
    <div>
      <p>hello</p>
    </div>
  `

  t.is(serialize(actual), expected)
})

test('children as an array', (t) => {
  const actual = createElement('div', [
    createElement('p'),
    createElement('p')
  ])

  const expected = tsml`
    <div>
      <p></p>
      <p></p>
    </div>
  `

  t.is(serialize(actual), expected)
})

test('children as an array with attributes', (t) => {
  const actual = createElement('div', {
    class: 'one'
  }, [
    createElement('p'),
    createElement('p')
  ])

  const expected = tsml`
    <div class="one">
      <p></p>
      <p></p>
    </div>
  `

  t.is(serialize(actual), expected)
})

test('children as a text node', (t) => {
  const actual = createElement('p', 'text')
  const expected = '<p>text</p>'
  t.is(serialize(actual), expected)
})

test('children and attributes', (t) => {
  const actual = createElement('div', { id: 'wrapper' },
    createElement('p', '1'),
    createElement('p', '2')
  )

  const expected = tsml`
    <div id="wrapper">
      <p>1</p>
      <p>2</p>
    </div>
  `

  t.is(serialize(actual), expected)
})

test('tags as functions', (t) => {
  const { div, p } = createElement

  const actual = div({ id: 'wrapper' },
    p('1'),
    p('2')
  )

  const expected = tsml`
    <div id="wrapper">
      <p>1</p>
      <p>2</p>
    </div>
  `

  t.is(serialize(actual), expected)
})

test.todo('svg tags as functions')

test('events', (t) => {
  const handler = () => 'clicked'
  const node = createElement('button', { onClick: handler })

  t.is(node.onclick, handler)
  t.is(node.onclick(), 'clicked')
})
