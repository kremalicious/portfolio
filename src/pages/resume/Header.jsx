import React from 'react'
import shortid from 'shortid'
import { useResume } from '../../hooks/use-resume'
import Icon from '../../components/atoms/Icon'
import styles from './Header.module.css'

export default function Header() {
  const { basics, languages } = useResume()
  const { name, label, email, website, location } = basics

  return (
    <>
      <header>
        <p>Résumé</p>
        <h1 className={styles.title}>{name}</h1>
        <h2 className={styles.label}>{label}</h2>
      </header>

      <div>
        <ul className={styles.contact}>
          <li>
            <a href={website}>
              <Icon name="Compass" />
              Portfolio
            </a>
          </li>
          <li>
            <Icon name="Mail" />
            <a href={`mailto:${email}`}>Email</a>
          </li>
          <li>
            <Icon name="MapPin" />
            {location.city}, {location.countryCode}
          </li>
          <li className={styles.languages}>
            <Icon name="Globe" />
            {languages.map(item => (
              <p key={shortid.generate()}>
                {item.language}
                <span>{item.fluency}</span>
              </p>
            ))}
          </li>
        </ul>
      </div>
    </>
  )
}
