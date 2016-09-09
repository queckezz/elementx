

![logo](./logo.png)

[![Build status][travis-image]][travis-url]
[![NPM version][version-image]][version-url]
[![Dependency Status][david-image]][david-url]
[![License][license-image]][license-url]
[![Js Standard Style][standard-image]][standard-url]
[![Downloads per month][downloads-image]][downloads-url]

> ​:zap:​ Functionally create [DOM](https://de.wikipedia.org/wiki/Document_Object_Model) elements and compose them to a tree quickly.

This module is an alternative to [jsx](https://facebook.github.io/react/docs/jsx-in-depth.html) or [template strings](https://github.com/shama/bel) for those who want to build up their DOM trees using plain function composition.

```js
div([
  h1('.bold', 'elementx'),
  h2('#subtitle', 'Create a DOM tree with ease'),
  button({ href: 'http://ghub.io/elementx' }, 'Open'),
  ul(['simple', 'functional', 'fast'].map(key => li(key)))
])
```

## Features

* Supports creating SVG Elements
* Convenient element event handling
* Boolean attributes (like `autofocus: true`)
* Pluggable API for hooking into specific attributes and modifying them
* Functional utilities can be used since it's just function composition
* Weights only `~3 kB` minified and gzipped
* Can be used with diffing libraries like [morphdom](https://github.com/patrick-steele-idem/morphdom) or [nanomorph](https://github.com/yoshuawuyts/nanomorph) for a unidirectional architecture

## Installation

```bash
> npm install elementx
```

## Usage

```js
const { div, h1, a } = require('elementx')

const tree = div('.container.p2#js-root', [
  h1('.title', 'This is a title'),
  div({ style: 'background-color: red;' }, [
    a({ href: 'http://github.com' }, 'Github')
  ])
])

console.log(tree.outerHTML)
/*
 * ->
 * <div class="full-width p2">
 *   <h1>Some text</h1>
 *   <div style="background-color: red;">
 *     <a href="http://github.com">Github</a>
 *   </div>
 * </div>
 */
```

## Getting Started

Each [element](https://github.com/ohanhi/hyperscript-helpers/blob/master/src/index.js#L26-L38) in the DOM is exposed as a function when requiring `elementx`.

```js
const { div, h1, p, button } = require('elementx')
```

These functions have the following syntax:

```js
tag(selector, attributes, children)
```

All arguments are **optional** with at least **one argument needing to be present**. This kind of function overloading allows you to iterate on your DOM structure really fast and reduce visual noise.

* **selector** can be `.title` to append a class or `#id` to give the element an id. These can be mixed as you might expect: `#id.title.pad.red`
* **attributes** is an object of dom attributes: `{ href: '#header' }`
* **children** can be a string for a text node or an array of nodes

### Lifecycle hooks

This module aims to be just the element creation layer. It can be used with any view framework using DOM as their base element abstraction for diffing. Some libraries like this include [choo](https://github.com/yoshuawuyts/choo) or [inu](https://github.com/ahdinosaur/inu).

### SVG

SVG works as expected. Sets the appropriate namespace for both elements and attributes. All SVG tags can only be created with the `h`-helper:

```js
const { svg, h } = require('elementx')

const node = svg({
  viewBox: '0 0 0 32 32',
  fill: 'currentColor',
  height: '32px',
  width: '32px'
}, [
  h('use', { 'xlink:href': '#my-id' })
])

document.body.appendChild(node)
```

### Use without helper functions

Sometimes you need to fall back to the traditional `createElement(tag, attributes, children)` (aliased to `h`), for example svg tags.

```js
const { h } = require('elementx')
// -> or { createElement }

const node = h('h1', 'text')

console.log(node.outerHTML)
/* 
 * ->
 * <h1>text</h1>
 */
```

### Events

All [HTML DOM Events](https://developer.mozilla.org/en-US/docs/Web/Events) can be attached. The casing of the event name doesn't matter (`onClick`, `onclick`, `ONCLICK` etc.)

```js
const node = button({ onClick: () => console.log('button has been clicked') })
document.body.appendChild(node)
```

### Built-in Sugar

This module includes some sugar which is essential to most single page applications today. If you feel like they add to much weight, you can always opt-out and require `elementx/decorate` for the barebones implementation.

#### Classes

Conditionally joins class names together. It utilizes JedWatson's awesome [classnames](https://github.com/JedWatson/classnames). Visit the [usage docs](https://github.com/JedWatson/classnames#usage) for more information.

#### Inline styles

Converts style objects to an inline string.

```js
const style = {
  textDecoration: 'underline',
  fontSize: '56px'
}

const node = h1({ style }, 'hello!')
// -> <h1 style='text-decoration:underline;font-size:56px;'>hello!</h1>
```

### Decorating attributes

To process an attribute further you can use the `decorate` submodule which allows you to hook into them:

```js
const decorate = require('elementx/decorate')

// automatically inlines style objects. Make sure to return the original value
// if you don't modify anything.
const { h1, div } = decorate((attr, value) => {
    case 'style':
      return typeof value !== 'string'
        ? toInlineStyle(value)
        : value
    default:
      return value
})

function render ({ backgroundColor }) {
  const style = { color: 'red', backgroundColor }
  return div([
    h1({ style })
  ])
}
```

## External tools

* [html-to-hyperscript](html-to-hyperscript.paqmind.com) - Webservice to convert HTML to hyperscript

## Tests

Tests are written using JSDOM.

```bash
> npm test
```

## License

[MIT][license-url]

[travis-image]: https://img.shields.io/travis/queckezz/elementx.svg?style=flat-square
[travis-url]: https://travis-ci.org/queckezz/elementx

[version-image]: https://img.shields.io/npm/v/elementx.svg?style=flat-square
[version-url]: https://npmjs.org/package/elementx

[downloads-image]: https://img.shields.io/npm/dm/elementx.svg?maxAge=2592000&amp;style=flat-square
[downloads-url]: https://npmjs.org/package/elementx

[david-image]: http://img.shields.io/david/queckezz/elementx.svg?style=flat-square
[david-url]: https://david-dm.org/queckezz/elementx

[standard-image]: https://img.shields.io/badge/code-standard-brightgreen.svg?style=flat-square
[standard-url]: https://github.com/feross/standard

[license-image]: http://img.shields.io/npm/l/elementx.svg?style=flat-square
[license-url]: ./license