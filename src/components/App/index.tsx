import React from 'react'
import { useRouter } from 'next/router'
// import HostnameCheck from '../_legacy/atoms/HostnameCheck'
import ThemeSwitch from '../ThemeSwitch'
import Header from '../Header'
import Footer from '../Footer'
import styles from './index.module.css'
import MetaFavicons from '../Meta/Favicons'

export default function App({ children }: { children: React.ReactNode }) {
  const router = useRouter()

  return (
    <>
      {/* <HostnameCheck allowedHosts={allowedHosts} />
       */}
      <MetaFavicons />
      <ThemeSwitch />
      <Header minimal={router.asPath !== '/'} />

      <main className={styles.screen}>{children}</main>

      <Footer />
    </>
  )
}
