
const shorthands = require('hyperscript-helpers')
const domEvents = require('@f/dom-events')

module.exports = Object.assign(
  {},
  shorthands(createElement),
  { createElement }
)

function createElement () {
  const { selector, children, attrs } = getArguments(arguments)
  let el = parseSelector(selector)

  for (var key in attrs) {
    const skip = addEvents(el, key, attrs[key])

    // don't include event listeners properties in the dom
    if (skip) continue

    attrs.hasOwnProperty(key) && el.setAttribute(key, attrs[key])
  }

  if (children.length === 0) return el

  children.forEach((child) => {
    if (isString(child)) child = document.createTextNode(child)
    el.appendChild(child)
  })

  return el
}

function addEvents (el, key, value) {
  // remove `on` and lowercase event
  const event = key.slice(2, key.length).toLowerCase()

  // keep a reference since events are not stored somewhere see
  // http://stackoverflow.com/questions/18116163/get-all-events-handlers-attached-to-an-element
  if (!el.events) el.events = {}
  el.events[event] = value

  if (domEvents.includes(event)) {
    el.addEventListener(event, value)
    return true
  }
}

/**
 * Parses the given `selector` into an element with the respective properties
 * set. This is code was heavily inspired by `hyperscript` and the regex is
 * directly copied.
 */

function parseSelector (selector) {
  const matches = selector.split(/([\.#]?[^\s#.]+)/)
  let node

  matches.forEach((match) => {
    const s = match.substring(1, match.length)
    if (!match) return

    if (!node) {
      node = document.createElement(match)
    } else if (match[0] === '.') {
      node.classList.add(s)
    } else if (match[0] === '#') {
      node.setAttribute('id', s)
    }
  })

  return node
}

/**
 * Sort the `createElement` arguments into named arguments.
 */

function getArguments (args) {
  let captures = { selector: '', attrs: {}, children: [] }

  for (var i = args.length - 1; i >= 0; i--) {
    const arg = args[i]

    if (Array.isArray(arg)) {
      captures.children = arg
    } else if (isPlainObject(arg)) {
      captures.attrs = arg
    } else if (isString(arg) && i === 0) {
      captures.selector = arg
    } else {
      captures.children = [arg]
    }
  }

  return captures
}

function isString (val) { return typeof val === 'string' }

function isPlainObject (o) {
  return Object(o) === o && Object.getPrototypeOf(o) === Object.prototype
}
