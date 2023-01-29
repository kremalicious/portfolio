import type { AppProps } from 'next/app'
import { ThemeProvider } from 'next-themes'
import Site from '../layouts/Site'
import '../styles/global.css'

export default function MyApp({ Component, pageProps, router }: AppProps) {
  return (
    <ThemeProvider attribute="class">
      <Site>
        <Component {...pageProps} />
      </Site>
    </ThemeProvider>
  )
}
