import Footer from '@/components/Footer'
import HostnameCheck from '@/components/HostnameCheck'
import ThemeSwitch from '@/components/ThemeSwitch'
import { generateOgImageUrl } from '@/lib/generateOgImageUrl'
import { UMAMI_SCRIPT_URL, UMAMI_WEBSITE_ID } from '@/lib/umami'
import type { Metadata, Viewport } from 'next'
import Script from 'next/script'
import type { ReactNode } from 'react'
import '@/styles/global.css'
import styles from '@/styles/layout.module.css'
import meta from '@content/meta.json'
import { Providers } from './providers'

const isProduction = process.env.NODE_ENV === 'production'

const { name, label } = meta.author

export const metadata: Metadata = {
  title: {
    template: `%s // ${name.toLowerCase()} { ${label.toLowerCase()} }`,
    default: `${name.toLowerCase()} { ${label.toLowerCase()} }`
  },
  description: meta.description,
  metadataBase: new URL(meta.url),
  alternates: { canonical: '/' },
  openGraph: {
    images: [{ url: generateOgImageUrl(meta.img) }],
    url: meta.url,
    locale: 'en_US'
  },
  twitter: { card: 'summary_large_image' }
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#e7eef4' },
    { media: '(prefers-color-scheme: dark)', color: '#1d2224' }
  ],
  colorScheme: 'light dark'
}

export default function RootLayout({ children }: { children: ReactNode }) {
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
        <link rel="manifest" href="/manifest/manifest.webmanifest" />

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
          <ThemeSwitch />

          <main className={styles.screen}>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
