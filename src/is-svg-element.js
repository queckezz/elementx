
const tags = require('svg-tag-names')

module.exports = isSvgElement

function isSvgElement (tag) {
  return tags.indexOf(tag) !== -1
}