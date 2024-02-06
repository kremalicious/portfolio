import meta from '@content/meta.json'
import LogoUnit from '../LogoUnit'
import Networks from '../Networks'
import Vcard from '../Vcard'
import styles from './index.module.css'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className={`h-card ${styles.footer}`}>
      <LogoUnit small />
      <Networks label="Networks Footer" small />

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
            {meta.author.name.toLowerCase()}
          </a>{' '}
          &mdash; All Rights Reserved
        </small>
      </p>
    </footer>
  )
}
