
const tags = require('svg-tag-names')

const isSvgElement = (tag) =>
  tags.indexOf(tag) !== -1

module.exports = isSvgElement
