import { Head, Html, Main, NextScript } from 'next/document'
import Typekit from '../components/Typekit'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <Typekit />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
