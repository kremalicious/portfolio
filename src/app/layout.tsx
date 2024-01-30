import { Providers } from './providers'
import Site from '../layouts/Site'
import '../styles/global.css'
import Script from 'next/script'

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          <Site>{children}</Site>
        </Providers>
      </body>
      <Script
        src={`https://use.typekit.net/${process.env.NEXT_PUBLIC_TYPEKIT_ID}.js`}
      />
    </html>
  )
}
