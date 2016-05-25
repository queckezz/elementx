

# create-dom-tree

> ![tree](./tree.png) Create a DOM tree with ease.
<br>

[![Build status][travis-image]][travis-url]
[![NPM version][version-image]][version-url]
[![Dependency Status][david-image]][david-url]
[![License][license-image]][license-url]
[![Js Standard Style][standard-image]][standard-url]

This module is intended for use in conjunction with [morphdom](https://github.com/patrick-steele-idem/morphdom) but can be used in any DOM-like environment. It's an alternative to [bel](https://github.com/shama/bel) or [hyperx](https://github.com/substack/hyperx) for those who want to build their DOM trees without template strings or JSX.
</div>

```js
div([
  h1('.bold', 'create-dom-tree'),
  h2('#subtitle', 'Create a DOM tree with ease'),
  button({ href: 'http://ghub.io/create-dom-tree' }, 'Open'),
  ul(['simple', 'functional', 'fast'].map(key => li(key)))
])
```

## Features

* Create complex DOM trees with ease
* Weights only ~1kb in size
* Functional utilities can be used since it's just functions
* Works perfectly with [morphdom](https://github.com/patrick-steele-idem/morphdom)

## Installation

```bash
> npm install create-dom-tree
```

## Usage

```js
const { div, h1, a } = require('create-dom-tree')

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

## Comparison

### `create-dom-tree`

```js
ul('.items', items.map((item) => li(item.text)))
```

### `hyperscript`

This traditional syntax is also available through `createElement` from this module

```js
h('ul.items', items.map((item) => li(item.text)))
```

### `jsx`

```js
<ul class='items'>
  {items.map((item) => <li>{item.title}</li>)}
</ul>
```

## Guide

Each [element](https://github.com/ohanhi/hyperscript-helpers/blob/master/src/index.js#L26-L38) in the DOM is exposed as a function when requiring `create-dom-tree`.

```js
const { div, h1, p, button } = require('create-dom-tree')
```

These functions have the following syntax:

```js
tag(selector, attributes, children)
```

Each argument is **optional** allowing you to create DOM trees really fast. At least **one argument** needs to be **present** however.

* **selector** can be `.title` to append a class or `#id` to give the element an id. These can be mixed as you might expect: `#id.title.pad.red`
* **attributes** is an object of dom attributes: `{ href: '#header' }`
* **children** can be a string for a text node or an array of children

### Events

You can write your events inline:

```js
button({ onClick: () => console.log('button has been clicked!') }, 'Click Here')
```

They can be written however you like: `onClick`, `onclick`, `ONCLICK` etc.

### Lifecycle hooks

This is not the concern of this module and should live in higher-level modules like [yo-yo](https://github.com/maxogden/yo-yo) or [inu](https://github.com/ahdinosaur/inu). If you feel like it should, [open an issue](http://github.com/queckezz/create-dom-tree/issues/new) to discuss.

### `createElement()`

If you want, you can fall back to the traditional `createElement(tag, attributes, children)` instead of the exposed helper functions.

```js
const { createElement } = require('create-dom-tree')
const h = createElement

const node = h('h1', 'text')

console.log(node.outerHTML)
/* 
 * ->
 * <h1>text</h1>
 */
```

### SVG Support

As of writing this, there is no SVG support yet. This is on the [roadmap](https://github.com/queckezz/create-dom-tree/issues/1)

## External tools

* [html-to-hyperscript](html-to-hyperscript.paqmind.com) - Webservice to convert HTML to hyperscript

## Differences from `hyperscript`

This module is a lot smaller because its focused on only creating DOM elements. Feel free to built upon this if you feel like needing any of the following features:

* No [observable](https://github.com/dominictarr/observable) support
* No default `div` tag since it's not needed with [hyperscript-helpers](https://github.com/ohanhi/hyperscript-helpers)

```js
createElement('text') // -> doesn't generate <div>Text</div>
```

* No [context](https://github.com/dominictarr/hyperscript/blob/master/test/index.js#L120-L126)

## Tests

```bash
> npm test
```

## License

[MIT][license-url]

<sub>The icon in the title was created by [Daniel Bruce](https://www.iconfinder.com/icons/80984/structure_icon#size=16) under the [Creative Commons Attribution-Share Alike 3.0 Unported License](http://creativecommons.org/licenses/by-sa/3.0/)</sub>

[travis-image]: https://img.shields.io/travis/queckezz/create-dom-tree.svg?style=flat-square
[travis-url]: https://travis-ci.org/queckezz/create-dom-tree

[version-image]: https://img.shields.io/npm/v/create-dom-tree.svg?style=flat-square
[version-url]: https://npmjs.org/package/create-dom-tree

[david-image]: http://img.shields.io/david/queckezz/create-dom-tree.svg?style=flat-square
[david-url]: https://david-dm.org/queckezz/create-dom-tree

[standard-image]: https://img.shields.io/badge/code-standard-brightgreen.svg?style=flat-square
[standard-url]: https://github.com/feross/standard

[license-image]: http://img.shields.io/npm/l/create-dom-tree.svg?style=flat-square
[license-url]: ./license