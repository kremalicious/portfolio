import Head from 'next/head'

const MetaFavicons = () => {
  return (
    <Head>
      {/* 
        Stop the favicon madness
        https://evilmartians.com/chronicles/how-to-favicon-in-2021-six-files-that-fit-most-needs 
      */}
      <link rel="icon" href="/favicon.ico" sizes="any" />
      <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      <link rel="manifest" href="/favicon/manifest.webmanifest"></link>
    </Head>
  )
}

export default MetaFavicons
