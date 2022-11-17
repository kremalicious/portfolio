import { useRouter } from 'next/router'
import ThemeSwitch from '../../components/ThemeSwitch'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import MetaFavicon from '../../components/Meta/Favicon'
import meta from '../../../_content/meta.json'
import HostnameCheck from '../../components/HostnameCheck'
import styles from './index.module.css'
import Script from 'next/script'
import { UMAMI_SCRIPT_URL, UMAMI_WEBSITE_ID } from '../../lib/umami'

const isProduction = process.env.NODE_ENV === 'production'

export default function Site({ children }: { children: React.ReactNode }) {
  const router = useRouter()

  return (
    <>
      {isProduction && (
        <Script src={UMAMI_SCRIPT_URL} data-website-id={UMAMI_WEBSITE_ID} />
      )}
      <HostnameCheck allowedHosts={meta.allowedHosts} />
      <MetaFavicon />
      <ThemeSwitch />

      <Header small={router.pathname !== '/'} />
      <main className={styles.screen}>{children}</main>
      <Footer />
    </>
  )
}
