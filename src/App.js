import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Table from './features/Table/Table'
import UserDetails from './features/UserDetails/UserDetails'


function App() {
  return (
    <div id='App' style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
      <Router>
        <Route exact path='/'>
          <Table />
        </Route>
        <Route path='/:userId'>
          <UserDetails />
        </Route>
      </Router>
    </div>
  )
}

export default App
