
const getSvgAttributeNamespace = require('./get-svg-attribute-namespace')
const isBooleanAttribute = require('./is-boolean-attribute')
const isSvgElement = require('./is-svg-element')
const document = require('global-undom')

const normalizeEvent = (ev) => 'on' + ev.slice(2, ev.length).toLowerCase()

const isEventHandler = (key) => key.slice(0, 2) === 'on'

const isString = (val) => typeof val === 'string'

const createElement = (transformAttrs, { node, children, attrs }) => {
  let el = isSvgElement(node)
    ? document.createElementNS('http://www.w3.org/2000/svg', node)
    : document.createElement(node)

  for (const nkey in attrs) {
    const [key, val] = transformAttrs(nkey, attrs[nkey])

    if (isEventHandler(key)) {
      // add event listeners to the node directly
      el[normalizeEvent(key)] = val
    } else if (isBooleanAttribute(key)) {
      // if it's a truthy boolean value, set the value to its own key.
      // If it's a falsy boolean value, ignore the attribute
      val !== false && el.setAttribute(key, key)
    } else {
      // otherwise just set the attribute on the element. Set the
      // namespace if it's an svg
      const ns = getSvgAttributeNamespace(key)
      ns
        ? el.setAttributeNS(ns, key, val)
        : el.setAttribute(key, val)
    }
  }

  if (children.length === 0) return el

  children.forEach(function (child) {
    if (!child) return
    if (isString(child)) child = document.createTextNode(child)
    el.appendChild(child)
  })

  return el
}

module.exports = createElement
