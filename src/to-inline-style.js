
const hyphenate = require('@f/hyphenate')

module.exports = toInlineStyle

function toInlineStyle (styles) {
  let str = ''

  for (var key in styles) {
    const val = styles[key]

    if (val !== null && val !== undefined) {
      str += format(hyphenate(key), val)
    }
  }

  return str
}

function format (key, value) {
  return key + ':' + value + ';'
}
