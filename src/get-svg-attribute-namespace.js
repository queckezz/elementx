
const ns = {
  ev: 'http://www.w3.org/2001/xml-events',
  xlink: 'http://www.w3.org/1999/xlink',
  xml: 'http://www.w3.org/XML/1998/namespace',
  xmlns: 'http://www.w3.org/2000/xmlns/'
}

const getSvgAttributeNamespace = (attr) => {
  if (attr.indexOf(':') === -1) return null
  var prefix = attr.split(':', 1)[0]
  return ns.hasOwnProperty(prefix)
    ? ns[prefix]
    : null
}

module.exports = getSvgAttributeNamespace
