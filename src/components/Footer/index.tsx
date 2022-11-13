import LogoUnit from '../LogoUnit'
import Networks from '../Networks'
import styles from './index.module.css'
import meta from '../../../_content/meta.json'
import resume from '../../../_content/resume.json'
import dynamic from 'next/dynamic'
import { Suspense } from 'react'

const DynamicVcard = dynamic(() => import('./Vcard'), {
  suspense: true
})

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className={`h-card ${styles.footer}`}>
      <LogoUnit small />
      <Networks small />

      <p className={styles.actions}>
        <Suspense fallback={'Add to addressbook'}>
          <DynamicVcard />
        </Suspense>

        <a className="u-key" href={meta.gpg}>
          PGP/GPG key
        </a>
        <a href={meta.bugs}>Found a bug?</a>
      </p>
      <p className={styles.copyright}>
        <small>
          &copy; {year}{' '}
          <a className="u-url" href={meta.url}>
            {resume.basics.name.toLowerCase()}
          </a>{' '}
          &mdash; All Rights Reserved
        </small>
      </p>
    </footer>
  )
}
