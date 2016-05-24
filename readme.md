
# create-dom-tree

> Create DOM trees using hyperscript like syntax. Supports SVG.

[![Build status][travis-image]][travis-url]
[![NPM version][version-image]][version-url]
[![Dependency Status][david-image]][david-url]
[![License][license-image]][license-url]
[![Js Standard Style][standard-image]][standard-url]

## Installation

```bash
npm install create-dom-tree
```

## Example

```js
var h = require('create-dom-tree')

var tree = h('div', { class: 'full-width p2'}, [
  h('h1', 'Some text'),
  h('div', { style: 'background-color: red;' }, [
    h('a', { href: 'http://github.com' }, 'Github')
  ])
])

console.log(tree.outerHTML)
/* ->
 * <div class="full-width p2">
 *   <h1>Some text</h1>
 *   <div style="background-color: red;">
 *     <a href="http://github.com">Github</a>
 *   </div>
 * </div>
 */
```

## Combinations

The following combinations are possible:

```js
h('tag')
h('tag', 'text')
h('tag', [...nodes])
h('tag', {...attrs})
h('tag', {...attrs}, 'text')
h('tag', {...attrs}, [...nodes])
```

## Differences from `hyperscript`

This module is a lot smaller because its focused on only creating DOM elements. Feel free to built upon this if you feel like needing any of the following features:

* No [obserable](https://github.com/dominictarr/observable) support
* No default `div` tag

```js
h('text') // -> doesn't generate <div>Text</div>
```

* No [context](https://github.com/dominictarr/hyperscript/blob/master/test/index.js#L120-L126)

## Tests

```bash
npm test
```

## License

[MIT][license-url]

[version-image]: https://img.shields.io/npm/v/create-dom-tree.svg?style=flat-square
[version-url]: https://npmjs.org/package/create-dom-tree

[david-image]: http://img.shields.io/david/queckezz/create-dom-tree.svg?style=flat-square
[david-url]: https://david-dm.org/queckezz/create-dom-tree

[standard-image]: https://img.shields.io/badge/code-standard-brightgreen.svg?style=flat-square
[standard-url]: https://github.com/feross/standard

[license-image]: http://img.shields.io/npm/l/create-dom-tree.svg?style=flat-square
[license-url]: ./license