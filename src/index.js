import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from '@reduxjs/toolkit'
import './index.css'
import * as serviceWorker from './serviceWorker'

import App from './App'
import combinedReducers from './reducers'
import { loadState, saveState } from './utils/storageUtils'

//  Populate state from browser sessionStorage upon refresh,
//  unless browser or tab was closed (found sessionsStorage sufficient rather than localStorage)
const persistedState = loadState()

const store = createStore(
  combinedReducers,
  persistedState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() 
)

// On each state change, save new state into sessionStorage
store.subscribe(() => {
  saveState(store.getState())
})

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)

serviceWorker.unregister()
