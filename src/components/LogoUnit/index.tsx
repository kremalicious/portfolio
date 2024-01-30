import Link from 'next/link'
import resume from '../../../_content/resume.json'
import Logo from '../../images/logo.svg'
import styles from './index.module.css'

type Props = {
  small?: boolean
}

export default function LogoUnit({ small }: Props) {
  const H = small ? 'h2' : 'h1'

  return (
    <Link
      className={`${styles.logounit} ${small ? styles.small : null}`}
      href="/"
      aria-current={!small ? 'page' : null}
    >
      <Logo className={styles.logo} />
      <H className={`p-name ${styles.title}`}>
        {resume.basics.name.toLowerCase()}
      </H>
      <p className={`p-job-title ${styles.description}`}>
        {resume.basics.label.toLowerCase()}
      </p>
    </Link>
  )
}
