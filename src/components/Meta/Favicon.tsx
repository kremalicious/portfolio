const MetaFavicons = () => {
  return (
    <>
      <meta name="viewport" content="width=device-width,initial-scale=1"></meta>
      {/* 
        Stop the favicon madness
        https://evilmartians.com/chronicles/how-to-favicon-in-2021-six-files-that-fit-most-needs 
      */}
      <link rel="icon" href="/favicon.ico" sizes="any" />
      <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      <link rel="manifest" href="/manifest/manifest.webmanifest"></link>
    </>
  )
}

export default MetaFavicons
