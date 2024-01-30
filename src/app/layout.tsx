import '../styles/global.css'
import { Providers } from './providers'
import Script from 'next/script'

import meta from '../../_content/meta.json'
import Footer from '../components/Footer'
import Header from '../components/Header'
import HostnameCheck from '../components/HostnameCheck'
// import MetaFavicon from '../components/Meta/Favicon'
// import ThemeSwitch from '../components/ThemeSwitch'
import { UMAMI_SCRIPT_URL, UMAMI_WEBSITE_ID } from '../lib/umami'
import styles from '../styles/layout.module.css'

const isProduction = process.env.NODE_ENV === 'production'

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          {isProduction && (
            <Script src={UMAMI_SCRIPT_URL} data-website-id={UMAMI_WEBSITE_ID} />
          )}
          <HostnameCheck allowedHosts={meta.allowedHosts} />
          {/* <MetaFavicon /> */}
          {/* <ThemeSwitch /> */}

          <Header />
          <main className={styles.screen}>{children}</main>
          <Footer />
        </Providers>
      </body>
      <Script
        src={`https://use.typekit.net/${process.env.NEXT_PUBLIC_TYPEKIT_ID}.js`}
      />
    </html>
  )
}
