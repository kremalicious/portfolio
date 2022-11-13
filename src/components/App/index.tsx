import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
// import HostnameCheck from '../_legacy/atoms/HostnameCheck'
import Typekit from '../Typekit'
import ThemeSwitch from '../ThemeSwitch'
import Header from '../Header'
import Footer from '../Footer'
import styles from './index.module.css'
import MetaFavicon from '../Meta/Favicon'
import { init } from '@socialgouv/matomo-next'
import meta from '../../../_content/meta.json'

export default function App({ children }: { children: React.ReactNode }) {
  const router = useRouter()

  // init Matomo tracking
  useEffect(() => {
    init({ url: meta.matomoUrl, siteId: meta.matomoSite })
  }, [])

  return (
    <>
      {/* <HostnameCheck allowedHosts={allowedHosts} />
       */}
      <Typekit />
      <MetaFavicon />
      <ThemeSwitch />
      <Header minimal={router.asPath !== '/'} />
      <main className={styles.screen}>{children}</main>
      <Footer />
    </>
  )
}
