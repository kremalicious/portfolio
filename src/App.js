import React, { Fragment } from 'react'
import FadeIn from './components/atoms/FadeIn'
import Routes from './Routes'
import Footer from './components/molecules/Footer'
import Helmet from 'react-helmet/es/Helmet'
import meta from './data/meta.json'

const Head = () => (
  <Helmet
    defaultTitle={`${meta.title.toLowerCase()} { ${meta.tagline.toLowerCase()} }`}
    titleTemplate={`%s // ${meta.title.toLowerCase()} { ${meta.tagline.toLowerCase()} }`}
  />
)

const App = () => (
  <Fragment>
    <Head />
    <FadeIn>
      <div className="app">
        <Routes />
        <Footer />
      </div>
    </FadeIn>
  </Fragment>
)

export default App
