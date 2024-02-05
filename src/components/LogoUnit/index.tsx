import Link from 'next/link'
import Logo from '@/images/logo.svg'
import meta from '@content/meta.json'
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
    >
      <Logo className={styles.logo} />
      <H className={`p-name ${styles.title}`}>
        {meta.author.name.toLowerCase()}
      </H>
      <p className={`p-job-title ${styles.description}`}>
        {meta.author.label.toLowerCase()}
      </p>
    </Link>
  )
}
