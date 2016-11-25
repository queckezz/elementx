
const attrs = [
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

const isBooleanAttribute = (attr) =>
  attrs.indexOf(attr) !== -1

module.exports = isBooleanAttribute
