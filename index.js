
var hyphenate = require('@f/hyphenate')
var decorate = require('./decorate')
var cn = require('classnames')

module.exports = decorate(function (key, value) {
  switch (key) {
    case 'class':
      return cn(value)
    case 'style':
      return typeof value !== 'string'
        ? toInlineStyle(value)
        : value
    default:
      return value
  }
})

function toInlineStyle (def) {
  return Object.keys(def)
    .map(prop => `${hyphenate(prop)}:${def[prop]}`)
    .join(';')
}
