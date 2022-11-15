import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Typekit from '../Typekit'
import ThemeSwitch from '../ThemeSwitch'
import Header from '../Header'
import Footer from '../Footer'
import styles from './index.module.css'
import MetaFavicon from '../Meta/Favicon'
import { init } from '@socialgouv/matomo-next'
import meta from '../../../_content/meta.json'
import HostnameCheck from '../HostnameCheck'

export default function App({ children }: { children: React.ReactNode }) {
  const router = useRouter()

  // init Matomo tracking
  useEffect(() => {
    init({ url: meta.matomoUrl, siteId: meta.matomoSite })
  }, [])

  return (
    <>
      <HostnameCheck allowedHosts={meta.allowedHosts} />
      <Typekit />
      <MetaFavicon />
      <ThemeSwitch />
      <Header small={router.asPath !== '/'} />
      <main className={styles.screen}>{children}</main>
      <Footer />
    </>
  )
}
