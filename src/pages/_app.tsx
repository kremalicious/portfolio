import { AppProps } from 'next/app'
import '../styles/global.css'
import App from '../components/App'
import { useEffect } from 'react'
import { init } from '@socialgouv/matomo-next'
import meta from '../../_content/meta.json'
import Typekit from '../components/Typekit'

export default function MyApp({ Component, pageProps }: AppProps) {
  // init Matomo tracking
  useEffect(() => {
    init({ url: meta.matomoUrl, siteId: meta.matomoSite })
  }, [])

  return (
    <>
      <Typekit />
      <App>
        <Component {...pageProps} />
      </App>
    </>
  )
}
