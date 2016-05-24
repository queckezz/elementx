
var isObject = require('@f/is-object')
var isString = require('@f/is-string')

module.exports = createTree

function createTree () {
  var ref = getArguments(arguments);
  var children = ref.children;
  var attrs = ref.attrs;
  var el = document.createElement(ref.selector)

  for (var key in attrs) {
    attrs.hasOwnProperty(key) && el.setAttribute(key, attrs[key])
  }

  if (children.length == 0) return el

  children.forEach(function (child) {
    if (isString(child)) child = document.createTextNode(child)
    el.appendChild(child)
  })

  return el
}

function getArguments (args) {
  var captures = { selector: 'div', attrs: {}, children: [] }

  for (var i = args.length - 1; i >= 0; i--) {
    var arg = args[i]

    if (Array.isArray(arg)) {
      captures.children = arg
    } else if (isObject(arg)) {
      captures.attrs = arg
    } else if (isString(arg) && i == 0) {
      captures.selector = arg
    } else {
      captures.children = [arg]
    }
  }

  return captures
}