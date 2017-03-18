
const htmlTags = require('html-tag-names')
const document = require('global-undom')
const svgTags = require('svg-tag-names')

const namespaces = {
  ev: 'http://www.w3.org/2001/xml-events',
  xlink: 'http://www.w3.org/1999/xlink',
  xml: 'http://www.w3.org/XML/1998/namespace',
  xmlns: 'http://www.w3.org/2000/xmlns/'
}

const booleanAttrs = [
  'defaultchecked',
  'formnovalidate',
  'indeterminate',
  'willvalidate',
  'autofocus',
  'checked',
  'disabled',
  'readonly',
  'required',
  'selected'
]

const isEventHandler = (key) => key.slice(0, 2) === 'on'

const normalizeEventName = (event) =>
  'on' + event.slice(2, event.length).toLowerCase()

const isPlainObject = (obj) =>
  typeof obj === 'object' && obj.constructor === Object

const contains = (val, obj) => obj.indexOf(val) !== -1

const getSvgAttributeNamespace = (attr) => {
  const prefix = attr.split(':', 1)[0]
  return namespaces.hasOwnProperty(prefix)
    ? namespaces[prefix]
    : null
}

const createElementTag = (tagName) => {
  return contains(tagName, svgTags)
    ? document.createElementNS('http://www.w3.org/2000/svg', tagName)
    : document.createElement(tagName)
}

const setAttribute = (element, key, value) => {
  return contains(':', key)
    ? element.setAttributeNS(getSvgAttributeNamespace(key), key, value)
    : element.setAttribute(key, value)
}

const createElement = (...args) => {
  let tagName, attrs
  const children = []
  args.forEach((arg) => {
    if (!arg) {
      return
    } else if (!tagName && typeof arg === 'string') {
      tagName = arg
    } else if (!attrs && isPlainObject(arg)) {
      attrs = arg
    } else if (Array.isArray(arg)) {
      children.push(...arg)
    } else {
      children.push(arg)
    }
  })

  const element = createElementTag(tagName)

  for (const key in attrs) {
    const value = attrs[key]

    if (isEventHandler(key)) {
      element[normalizeEventName(key)] = value
    } else if (contains(key, booleanAttrs)) {
      value !== false && element.setAttribute(key, key)
    } else {
      setAttribute(element, key, value)
    }
  }

  if (children && children.length > 0) {
    children.forEach((child) => {
      if (!child) {
        return
      }

      element.appendChild(
         typeof child === 'string'
          ? document.createTextNode(child)
          : child
      )
    })
  }

  return element
}

const createTagFactory = (tag) => {
  return (...args) => createElement(tag, ...args)
}

module.exports = createElement

svgTags.concat(htmlTags).forEach((tag) => {
  module.exports[tag] = createTagFactory(tag)
})
