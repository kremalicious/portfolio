import { useEffect } from 'react'
import { useRouter } from 'next/router'
import ThemeSwitch from '../../components/ThemeSwitch'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import MetaFavicon from '../../components/Meta/Favicon'
import { init } from '@socialgouv/matomo-next'
import meta from '../../../_content/meta.json'
import HostnameCheck from '../../components/HostnameCheck'
import styles from './index.module.css'

export default function Site({ children }: { children: React.ReactNode }) {
  const router = useRouter()

  // init Matomo tracking
  useEffect(() => {
    if (window._paq) return
    init({ url: meta.matomoUrl, siteId: meta.matomoSite })
  }, [])

  return (
    <>
      <HostnameCheck allowedHosts={meta.allowedHosts} />
      <MetaFavicon />
      <ThemeSwitch />

      <Header small={router.asPath !== '/'} />
      <main className={styles.screen}>{children}</main>
      <Footer />
    </>
  )
}
