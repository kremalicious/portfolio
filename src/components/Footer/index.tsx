import LogoUnit from '../LogoUnit'
import Networks from '../Networks'
import Location from '../Location'
import styles from './index.module.css'
import Vcard from './Vcard'
import meta from '../../../_content/meta.json'
import resume from '../../../_content/resume.json'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className={`h-card ${styles.footer}`}>
      <LogoUnit minimal />
      <Networks small />
      <Location />

      <p className={styles.actions}>
        <Vcard />
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
