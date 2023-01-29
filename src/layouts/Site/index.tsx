import { useRouter } from 'next/router'
import Script from 'next/script'
import meta from '../../../_content/meta.json'
import Footer from '../../components/Footer'
import Header from '../../components/Header'
import HostnameCheck from '../../components/HostnameCheck'
import MetaFavicon from '../../components/Meta/Favicon'
import ThemeSwitch from '../../components/ThemeSwitch'
import { UMAMI_SCRIPT_URL, UMAMI_WEBSITE_ID } from '../../lib/umami'
import styles from './index.module.css'

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
