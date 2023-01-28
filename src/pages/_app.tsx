import type { AppProps } from 'next/app'
import '../styles/global.css'
import Site from '../layouts/Site'
import { ThemeProvider } from 'next-themes'

export default function MyApp({ Component, pageProps, router }: AppProps) {
  return (
    <ThemeProvider attribute="class">
      <Site>
        <Component {...pageProps} />
      </Site>
    </ThemeProvider>
  )
}
