import React, { Fragment } from 'react'
import Helmet from 'react-helmet/es/Helmet'
import Routes from './Routes'
import FadeIn from './components/atoms/FadeIn'
import Footer from './components/molecules/Footer'
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
