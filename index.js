
var htmlTags = require('html-tag-names')
var document = require('global-undom')
var svgTags = require('svg-tag-names')

var slice = Array.prototype.slice

var booleanAttrs = [
  'allowfullscreen',
  'async',
  'autofocus',
  'checked',
  'compact',
  'declare',
  'default',
  'defer',
  'disabled',
  'formnovalidate',
  'hidden',
  'inert',
  'ismap',
  'itemscope',
  'multiple',
  'multiple',
  'muted',
  'nohref',
  'noresize',
  'noshade',
  'novalidate',
  'nowrap',
  'open',
  'readonly',
  'required',
  'reversed',
  'seamless',
  'selected',
  'sortable',
  'truespeed',
  'typemustmatch',
  'contenteditable',
  'spellcheck'
]

var ns = {
  ev: 'http://www.w3.org/2001/xml-events',
  xlink: 'http://www.w3.org/1999/xlink',
  xml: 'http://www.w3.org/XML/1998/namespace',
  xmlns: 'http://www.w3.org/2000/xmlns/'
}

module.exports = createElement

svgTags.concat(htmlTags).forEach(function (tag) {
  module.exports[tag] = createHelper(tag)
})

function createHelper (tag) {
  return function () {
    var args = slice.call(arguments)
    return createElement.apply(null, [tag].concat(args))
  }
}

function createElement () {
  var args = parseArguments(arguments)
  var children = args.children
  var attrs = args.attrs
  var tag = args.tag

  var el = isSvgElement(tag)
    ? document.createElementNS('http://www.w3.org/2000/svg', tag)
    : document.createElement(tag)

  for (var key in attrs) {
    var val = attrs[key]

    if (isEventHandler(key)) {
      // add event listeners to the node directly
      el[normalizeEvent(key)] = val
    } else if (isBooleanAttr(key)) {
      // if it's a truthy boolean value, set the value to its own key.
      // If it's a falsy boolean value, ignore the attribute
      val !== false && el.setAttribute(key, key)
    } else {
      // otherwise just set the attribute on the element. Set the
      // namespace if it's an svg
      var namespace = getSvgAttributeNamespace(key)

      namespace
        ? el.setAttributeNS(namespace, key, val)
        : el.setAttribute(key, val)
    }
  }

  if (children.length === 0) {
    return el
  }

  children.forEach(function (child) {
    if (!child) return

    if (isString(child)) {
      child = document.createTextNode(child)
    }

    el.appendChild(child)
  })

  return el
}

function parseArguments (args) {
  var children = []
  var attrs = {}
  var tag

  for (var i = args.length - 1; i >= 0; i--) {
    var arg = args[i]

    if (i === 0) {
      tag = arg
    } else if (Array.isArray(arg)) {
      children = arg
    } else if (isObj(arg)) {
      attrs = arg
    } else {
      children = [String(arg)]
    }
  }

  return {
    children: children,
    attrs: attrs,
    tag: tag
  }
}

function isBooleanAttr (attr) {
  return booleanAttrs.indexOf(attr) !== -1
}

function getSvgAttributeNamespace (attr) {
  if (attr.indexOf(':') === -1) {
    return null
  }

  var prefix = attr.split(':', 1)[0]
  return ns.hasOwnProperty(prefix)
    ? ns[prefix]
    : null
}

function isSvgElement (tag) {
  return svgTags.indexOf(tag) !== -1
}

function normalizeEvent (event) {
  return 'on' + event
    .slice(2, event.length)
    .toLowerCase()
}

function isObj (val) {
  return typeof val === 'object'
}

function isString (val) {
  return typeof val === 'string'
}

function isEventHandler (key) {
  return key.slice(0, 2) === 'on'
}
