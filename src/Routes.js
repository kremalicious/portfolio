import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Home from './components/pages/Home'
import NotFound from './components/pages/NotFound'

const Routes = () => (
  <Switch>
    <Route exact component={Home} path="/" />
    <Route component={NotFound} />
  </Switch>
)

export default Routes
