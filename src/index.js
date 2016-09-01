
const isBooleanAttribute = require('./is-boolean-attribute')
const toInlineStyle = require('./to-inline-style')
const shorthands = require('hyperscript-helpers')
const isSvgElement = require('./is-svg-element')
const parse = require('parse-hyperscript')
const classnames = require('classnames')

module.exports = Object.assign({}, shorthands(createElement), {
  h: createElement,
  createElement
})

function createElement () {
  const { node, attrs, children } = parse(arguments)

  const el = isSvgElement(node)
    ? document.createElementNS('http://www.w3.org/2000/svg', node)
    : document.createElement(node)

  for (let key in attrs) {
    if (!attrs.hasOwnProperty(key)) continue
    let attr

    // if attr is `className`, rewrite to `class` otherwise decorate as usual.
    if (key === 'className') {
      key = 'class'
      attr = decorate(key, attrs.className)
    } else {
      attr = decorate(key, attrs[key])
    }

    // if it's a truthy boolean value, set the value to its own key. If it's
    // a falsy boolean value, ignore the attribute. Otherwise just set the
    // attribute.
    isBooleanAttribute(key)
      ? attr !== false && el.setAttribute(key, key)
      : el.setAttribute(key, attr)
  }

  if (children.length === 0) return el

  children.forEach((child) => {
    if (!child) return
    if (isString(child)) child = document.createTextNode(child)
    el.appendChild(child)
  })

  return el
}

function decorate (attr, value) {
  switch (attr) {
    case 'class':
      return classnames(value)
    case 'style':
      return typeof value !== 'string'
        ? toInlineStyle(value)
        : value
    default:
      return value
  }
}

function isString (val) { return typeof val === 'string' }
