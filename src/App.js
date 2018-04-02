import React from 'react'
import FadeIn from './components/atoms/FadeIn'
import Routes from './Routes'

const App = () => (
  <FadeIn>
    <div className="app">
      <Routes />
    </div>
  </FadeIn>
)

export default App
