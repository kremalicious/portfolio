import '../styles/global.css'
import { Providers } from './providers'
import Script from 'next/script'
import meta from '../../_content/meta.json'
import resume from '../../_content/resume.json'
import Footer from '../components/Footer'
import Header from '../components/Header'
import HostnameCheck from '../components/HostnameCheck'
// import ThemeSwitch from '../components/ThemeSwitch'
import { UMAMI_SCRIPT_URL, UMAMI_WEBSITE_ID } from '../lib/umami'
import styles from '../styles/layout.module.css'
import { Metadata } from 'next'

const isProduction = process.env.NODE_ENV === 'production'

export const metadata: Metadata = {
  title: {
    template: `%s // ${resume.basics.name.toLowerCase()} { ${resume.basics.label.toLowerCase()} }`,
    default: `${resume.basics.name.toLowerCase()} { ${resume.basics.label.toLowerCase()} }`
  },
  description: meta.description,
  metadataBase: new URL(meta.url),
  alternates: { canonical: '/' },
  openGraph: {
    images: [{ url: meta.img }],
    url: meta.url,
    locale: 'en_US',
    type: 'website'
  },
  twitter: { card: 'summary_large_image' }
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          rel="stylesheet"
          href={`https://use.typekit.net/${process.env.NEXT_PUBLIC_TYPEKIT_ID}.css`}
        />
        {/* 
          Stop the favicon madness
          https://evilmartians.com/chronicles/how-to-favicon-in-2021-six-files-that-fit-most-needs 
        */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest/manifest.webmanifest"></link>

        {isProduction && (
          <Script
            src={UMAMI_SCRIPT_URL}
            data-website-id={UMAMI_WEBSITE_ID}
            async
          />
        )}
      </head>
      <body>
        <Providers>
          <HostnameCheck allowedHosts={meta.allowedHosts} />
          {/* <ThemeSwitch /> */}

          <Header />
          <main className={styles.screen}>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
