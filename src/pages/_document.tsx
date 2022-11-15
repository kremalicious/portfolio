import { Html, Head, Main, NextScript } from 'next/document'
import Typekit from '../components/Typekit'

export default function Document() {
  return (
    <Html>
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
