
const _createElement = require('./create-element')
const helpers = require('hyperscript-helpers')
const parse = require('parse-hyperscript')
const hyphenate = require('@f/hyphenate')
const cn = require('classnames')

const toInlineStyle = (def) => Object.keys(def)
  .map((prop) => hyphenate(prop) + ':' + def[prop])
  .join(';')

const idTransform = (key, val) => val

const defaultTransformAttrs = (key, val) => {
  switch (key) {
    case 'className':
      return defaultTransformAttrs('class', val)
    case 'class':
      return [key, cn(val)]
    case 'style':
      return [
        key,
        typeof val !== 'string'
          ? toInlineStyle(val)
          : val
      ]
    default:
      return [key, val]
  }
}

const createElementx = (transformAttrs = idTransform) => {
  function createElement () {
    return _createElement(
      (key, val) => transformAttrs(key, defaultTransformAttrs(key, val)),
      parse(arguments)
    )
  }

  return Object.assign({}, helpers(createElement), {
    h: createElement,
    createElement
  })
}

Object.assign(
  module.exports,
  createElementx(),
  { createElementx }
)
