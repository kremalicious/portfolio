import React, { Component, Fragment } from 'react'
import Header from '../molecules/Header'
import Projects from '../organisms/Projects'
import './Home.css'

class Home extends Component {
  render() {
    return (
      <Fragment>
        <Header />
        <main className="screen screen--home">
          <Projects />
        </main>
      </Fragment>
    )
  }
}

export default Home
