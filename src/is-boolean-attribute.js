
module.exports = isBooleanAttribute

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

function isBooleanAttribute (attr) {
  return attrs.indexOf(attr) !== -1
}
