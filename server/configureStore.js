import createHistory from 'history/createMemoryHistory'
import { NOT_FOUND } from 'redux-first-router'
import configureStore from '../src/configureStore'

export default async (req, res) => {
  const jwToken = 'real' // see server/index.js to change jwToken
  const preLoadedState = { jwToken } // onBeforeChange will authenticate using this

  const history = createHistory({ initialEntries: [req.url] })
  const { store, thunk } = configureStore(history, preLoadedState)

  // if not using onBeforeChange + jwTokens, you can also async authenticate
  // here against your db (i.e. using req.cookies.sessionId)

  let { location } = store.getState()
  if (doesRedirect(location, res)) return false

  // using redux-thunk perhaps request and dispatch some app-wide state as well, e.g:
  // await Promise.all([store.dispatch(myThunkA), store.dispatch(myThunkB)])

  await thunk(store) // THE PAYOFF BABY!

  // eslint-disable-next-line
  location = store.getState().location // remember: state has now changed
  if (doesRedirect(location, res)) return false // only do this again if ur thunks have redirects

  const status = location.type === NOT_FOUND ? 404 : 200
  res.statusCode = status
  return store
}

const doesRedirect = ({ kind, pathname }, res) => {
  if (kind === 'redirect') {
    res.redirect(302, pathname)
    return true
  }
  return false
}
