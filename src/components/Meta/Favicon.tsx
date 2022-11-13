import Head from 'next/head'

const MetaFavicons = () => {
  return (
    <Head>
      <meta name="msapplication-config" content="/favicon/browserconfig.xml" />
      <meta
        name="msapplication-TileImage"
        content="/favicon/mstile-144x144.png"
      />
      <meta name="apple-mobile-web-app-title" content="mk" />
      <meta
        name="apple-mobile-web-app-status-bar-style"
        content="black-translucent"
      />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <link
        rel="apple-touch-icon"
        sizes="1024x1024"
        href="/favicon/apple-touch-icon-1024x1024.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/favicon/apple-touch-icon-180x180.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="167x167"
        href="/favicon/apple-touch-icon-167x167.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="152x152"
        href="/favicon/apple-touch-icon-152x152.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="144x144"
        href="/favicon/apple-touch-icon-144x144.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="120x120"
        href="/favicon/apple-touch-icon-120x120.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="114x114"
        href="/favicon/apple-touch-icon-114x114.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="76x76"
        href="/favicon/apple-touch-icon-76x76.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="72x72"
        href="/favicon/apple-touch-icon-72x72.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="60x60"
        href="/favicon/apple-touch-icon-60x60.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="57x57"
        href="/favicon/apple-touch-icon-57x57.png"
      />
      <meta name="application-name" content="matthias kretschmann" />
      <meta name="mobile-web-app-capable" content="yes" />
      <link rel="manifest" href="/favicon/manifest.webmanifest" />
      <link
        rel="icon"
        type="image/png"
        sizes="48x48"
        href="/favicon/favicon-48x48.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon/favicon-16x16.png"
      />

      {/* <link
        rel="mask-icon"
        href="/favicon/safari-pinned-tab.svg"
        color="#000000"
      /> */}
      <link rel="shortcut icon" href="/favicon/favicon.ico" />
    </Head>
  )
}

export default MetaFavicons
