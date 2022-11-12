import React from 'react'
import Link from 'next/link'
import Logo from '../../images/logo.svg'
import styles from './index.module.css'
import resume from '../../../_content/resume.json'

type Props = {
  minimal?: boolean
}

export default function LogoUnit({ minimal }: Props) {
  return (
    <Link className={minimal ? styles.minimal : styles.logounit} href={'/'}>
      <Logo className={styles.logo} />
      <h1 className={`p-name ${styles.title}`}>
        {resume.basics.name.toLowerCase()}
      </h1>
      <p className={`p-job-title ${styles.description}`}>
        {resume.basics.label.toLowerCase()}
      </p>
    </Link>
  )
}
