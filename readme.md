

![logo](./logo.png)

> ![tree](./tree.png) Create [DOM](https://de.wikipedia.org/wiki/Document_Object_Model) elements with a convenient syntax, supporting a unidirectional infrastructure
> <br>

[![Build status][travis-image]][travis-url]
[![NPM version][version-image]][version-url]
[![Dependency Status][david-image]][david-url]
[![License][license-image]][license-url]
[![Js Standard Style][standard-image]][standard-url]

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

* Supports SVG
* Supports boolean attributes like `autofocus: true`
* Weights only `2.8kb` minified and gzipped
* Functional utilities can be used since it's just functions
* Can be used with diffing libraries like [morphdom](https://github.com/patrick-steele-idem/morphdom) or [nanomorph](https://github.com/yoshuawuyts/nanomorph) for a unidirectional infrastructure

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

## Guide

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

This module aims to be just the element creation layer. It can be used with any view framework using DOM as their base abstraction. Some frameworks include choo](https://github.com/ahdinosaur/inu) or [inu](https://github.com/ahdinosaur/inu).

### Use without helper functions

Sometimes you need to fall back to the traditional `createElement(tag, attributes, children)` (aliased to `h`) for example svg tags.

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

## Differences from `hyperscript`

This module is a lot smaller because its focused on only creating DOM elements. Feel free to built upon this if you feel like needing any of the following features:

* No [observable](https://github.com/dominictarr/observable) support
* No default `div` tag since it's not needed with [hyperscript-helpers](https://github.com/ohanhi/hyperscript-helpers)

```js
createElement('text') // -> doesn't generate <div>Text</div>
```

* No [context](https://github.com/dominictarr/hyperscript/blob/master/test/index.js#L120-L126)

## External tools

* [html-to-hyperscript](html-to-hyperscript.paqmind.com) - Webservice to convert HTML to hyperscript

## Tests

Tests are written using JSDOM.

```bash
> npm test
```

## License

[MIT][license-url]

<sub>The icon in the title was created by [Daniel Bruce](http://danielbruce.se) under the [Creative Commons Attribution-Share Alike 3.0 Unported License](http://creativecommons.org/licenses/by-sa/3.0/)</sub>

[travis-image]: https://img.shields.io/travis/queckezz/elementx.svg?style=flat-square
[travis-url]: https://travis-ci.org/queckezz/elementx

[version-image]: https://img.shields.io/npm/v/elementx.svg?style=flat-square
[version-url]: https://npmjs.org/package/elementx

[david-image]: http://img.shields.io/david/queckezz/elementx.svg?style=flat-square
[david-url]: https://david-dm.org/queckezz/elementx

[standard-image]: https://img.shields.io/badge/code-standard-brightgreen.svg?style=flat-square
[standard-url]: https://github.com/feross/standard

[license-image]: http://img.shields.io/npm/l/elementx.svg?style=flat-square
[license-url]: ./license