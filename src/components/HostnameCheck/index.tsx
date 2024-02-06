'use client'

import { useEffect, useState } from 'react'
import styles from './index.module.css'

type Props = {
  allowedHosts: string[]
}

export async function generateMetadata({ params }: { params: Props }) {
  const isAllowedHost = params.allowedHosts.includes(window.location.hostname)

  if (!isAllowedHost) {
    return {
      robots: {
        index: false,
        follow: false
      }
    }
  }
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
    <aside className={styles.hostnameInfo}>
      <p>{`Hi there 👋. Please note that only the code and documentation of this
          site are open source. But my logo and the combination of typography,
          colors, and layout making up my brand identity are not. Don't just
          clone, do a remix.`}</p>
    </aside>
  )
}
