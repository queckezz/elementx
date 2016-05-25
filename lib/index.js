
var shorthands = require('hyperscript-helpers')
var domEvents = require('@f/dom-events')

module.exports = Object.assign(
  {},
  shorthands(createElement),
  { createElement: createElement }
)

function createElement () {
  var ref = getArguments(arguments);
  var children = ref.children;
  var attrs = ref.attrs;
  var el = parseSelector(ref.selector)

  for (var key in attrs) {
    var skip = addEvents(el, key, attrs[key])
    if (skip) continue
    attrs.hasOwnProperty(key) && el.setAttribute(key, attrs[key])
  }

  if (children.length === 0) return el

  children.forEach(function (child) {
    if (isString(child)) child = document.createTextNode(child)
    el.appendChild(child)
  })

  return el
}

function addEvents (el, key, value) {
  var event = key.slice(2, key.length).toLowerCase()

  // keep a reference since events are not stored somewhere see
  // http://stackoverflow.com/questions/18116163/get-all-events-handlers-attached-to-an-element
  if (!el.events) el.events = {}
  el.events[event] = value

  if (domEvents.includes(event)) {
    el.addEventListener(event, value)
    return true
  }
}

function parseSelector (str) {
  var matches = str.split(/([\.#]?[^\s#.]+)/)
  var node

  matches.forEach(function (match) {
    var s = match.substring(1, match.length)
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

function getArguments (args) {
  var captures = { selector: 'div', attrs: {}, children: [] }

  for (var i = args.length - 1; i >= 0; i--) {
    var arg = args[i]

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
