
![logo](./logo.png)

[![npm version][version-image]][version-url]
[![build status][travis-image]][travis-url]
[![test coverage][codecov-image]][codecov-url]
[![dependency status][david-image]][david-url]
[![license][license-image]][license-url]
[![js standard style][standard-image]][standard-url]
[![downloads per month][downloads-image]][downloads-url]
[![unfancy javascript][unfancy-js-image]][unfancy-js-url]

> ​:zap:​ FCreate complex [DOM](https://de.wikipedia.org/wiki/Document_Object_Model) elements/trees using a functional approach.

This module provides an alternative to [JSX](https://facebook.github.io/jsx/) or [template strings](https://github.com/shama/bel) for those who want to build up their DOM trees using plain function composition.

```js
const { div, h1, h2, button, ul, li } = require('elementx')

div(
  h1('.bold', 'elementx'),
  h2('#subtitle', 'Create a DOM tree with ease'),
  button({ href: 'http://ghub.io/elementx' }, 'Open'),
  ul(
    ['simple', 'functional', 'fast']
      .map(key => li(key))
  )
)
```

## Features

* **Universal** - Works in Node and Browser
* **SVG Support** - Supports creating SVG Elements
* **Functional** - Since it's just function composition we can arbitrarily compose them
* **Small** Only `~3 kB` minified and gzipped
* **Interoperability** Can be used with diffing libraries like [morphdom](https://github.com/patrick-steele-idem/morphdom), [nanomorph](https://github.com/yoshuawuyts/nanomorph) or anyhting that uses the DOM

## Installation

```bash
> npm install elementx
```

## Usage

```js
const { div, h1, a } = require('elementx')

const node = div(
  h1({ class: 'title' }, 'This is a title'),
  div({ class: 'bg-red' },
    a({ href: 'http://github.com' }, 'Github')
  )
)

// mount the tree to the DOM
document.body.appendChild(node)

console.log(tree.outerHTML)
/*
 * ->
 * <div class="title">
 *   <h1>This is a title</h1>
 *   <div class="bg-red">
 *     <a href="http://github.com">Github</a>
 *   </div>
 * </div>
 */
```

## Getting Started

Each [HTML tag](http://ghub.io/html-tag-names) is exposed as a function when requiring `elementx`.

```js
// using destructuring
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
const { svg } = require('elementx')

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
const h = require('elementx')

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
const node = h.button({
  onClick: () => console.log('button has been clicked')
})

document.body.appendChild(node)
```

## External tools

* [html-to-hyperscript](html-to-hyperscript.paqmind.com) - Web-Service to convert HTML to hyperscript

## Tests

```bash
> npm test
```

## License

[MIT][license-url]

[travis-image]: https://img.shields.io/travis/queckezz/elementx.svg?style=flat-square
[travis-url]: https://travis-ci.org/queckezz/elementx

[version-image]: https://img.shields.io/npm/v/elementx.svg?style=flat-square
[version-url]: https://npmjs.org/package/elementx

[codecov-image]: https://img.shields.io/codecov/c/github/queckezz/elementx/master.svg?style=flat-square
[codecov-url]: https://codecov.io/github/queckezz/elementx

[downloads-image]: https://img.shields.io/npm/dm/elementx.svg?style=flat-square
[downloads-url]: https://npmjs.org/package/elementx

[david-image]: http://img.shields.io/david/queckezz/elementx.svg?style=flat-square
[david-url]: https://david-dm.org/queckezz/elementx

[standard-image]: https://img.shields.io/badge/code-standard-brightgreen.svg?style=flat-square
[standard-url]: https://github.com/feross/standard

[unfancy-js-image]: https://img.shields.io/badge/javascript-unfancy-ff69b4.svg?style=flat-square
[unfancy-js-url]: https://github.com/yoshuawuyts/tiny-guide-to-non-fancy-node

[license-image]: http://img.shields.io/npm/l/elementx.svg?style=flat-square
[license-url]: ./license