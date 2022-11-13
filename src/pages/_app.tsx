import { AppProps } from 'next/app'
import '../styles/global.css'
import App from '../components/App'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <App>
      <Component {...pageProps} />
    </App>
  )
}
