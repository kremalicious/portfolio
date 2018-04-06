import React from 'react'
import Header from '../components/molecules/Header'
import Projects from '../components/organisms/Projects'

const Home = () => (
  <div>
    <Header />
    <main className="screen screen--home">
      <Projects />
    </main>
  </div>
)

export default Home
