import { useEffect, useState } from 'react'
import Head from 'next/head'
import styles from './index.module.css'

type Props = {
  allowedHosts: string[]
}

export default function HostnameCheck({ allowedHosts }: Props) {
  // default to true so SSR builds never show the banner
  const [isAllowedHost, setIsAllowedHost] = useState(true)

  useEffect(() => {
    if (typeof window !== 'undefined' && window.location) {
      const isAllowedHost = allowedHosts.includes(window.location.hostname)
      setIsAllowedHost(isAllowedHost)
    }
  }, [allowedHosts])

  return isAllowedHost ? null : (
    <>
      <Head>
        <meta name="robots" content="noindex,nofollow" />
      </Head>
      <aside className={styles.hostnameInfo}>
        <p>{`Hi there 👋. Please note that only the code and documentation of this
          site are open source. But my logo and the combination of typography,
          colors, and layout making up my brand identity are not. Don't just
          clone, do a remix.`}</p>
      </aside>
    </>
  )
}
