import React from 'react'
import Header from './components/molecules/Header.js'
import FadeIn from './components/atoms/FadeIn'
import Routes from './Routes'

const App = () => (
  <FadeIn>
    <div className="app">
      <Header />
      <Routes />
    </div>
  </FadeIn>
)

export default App
