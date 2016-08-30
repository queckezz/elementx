
const shorthands = require('hyperscript-helpers')
const parse = require('parse-hyperscript')

module.exports = Object.assign({}, shorthands(createElement), {
  h: createElement,
  createElement
})

function createElement () {
  const { node, attrs, children } = parse(arguments)
  const el = document.createElement(node)

  for (let key in attrs) {
    attrs.hasOwnProperty(key) && el.setAttribute(key, attrs[key])
  }

  if (children.length === 0) return el

  children.forEach((child) => {
    if (isString(child)) child = document.createTextNode(child)
    el.appendChild(child)
  })

  return el
}

function isString (val) { return typeof val === 'string' }
