import { AppProps } from 'next/app'
import '../styles/global.css'
import Site from '../layouts/Site'

export default function MyApp({ Component, pageProps, router }: AppProps) {
  return (
    <Site>
      <Component {...pageProps} key={router.asPath} />
    </Site>
  )
}
