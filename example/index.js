
const { div, h1, button } = require('..')
const diffpatch = require('morphdom')

const { subscribe, setState, getState } = createStore({ count: 0 })
const mount = document.getElementById('js-root')

/**
 * On each state update, morph the app based on the new state.
 */

subscribe((state) => {
  render(
    app(state),
    mount
  )
})

setInterval(() => {
  setState({ count: getState().count + 1})
}, 1000)

function app (state) {
  return div([
    h1(String(state.count)),
    button({ onClick: () => setState({ count: getState().count + 1 }) }, '+'),
    button({ onClick: () => setState({ count: getState().count - 1 }) }, '-')
  ])

  // atm you need to actively pull for the state which is not ideal. For
  // simplicity however, this works perfectly fine. Alternative would be to
  // bubble up the events and trigger the appropiate handlers on each state
  // change.
  function onClick () {
    setState({ count: getState().count + 1 })
  }
}

function render (node, root) {
  const tree = diffpatch(root, node, { childrenOnly: true })
}

/**
 * Ultra minimalistic store with `setState` updating the state and calling its
 * `subscribe`d listeners.
 */

function createStore (initialState) {
  let state = initialState || {}
  let listeners = []
  return {
    getState: () => state,
    subscribe: (cb) => {
      if (initialState) cb(state)
      listeners.push(cb)
    },
    setState: (obj) => {
      state = Object.assign({}, state, obj)
      listeners.forEach((listener) => listener(state))
    }
  }
}