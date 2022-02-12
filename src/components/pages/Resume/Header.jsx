import React from 'react'
import { useResume } from '../../../hooks/use-resume'
import Icon from '../../atoms/Icon'
import { title, description, contact, languagesList } from './Header.module.css'

export default function Header() {
  const { basics, languages } = useResume()
  const { name, label, email, website, location } = basics

  return (
    <>
      <header>
        <p>Résumé</p>
        <h1 className={title}>{name}</h1>
        <h2 className={description}>{label}</h2>
      </header>

      <div>
        <ul className={contact}>
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
          <li className={languagesList}>
            <Icon name="Globe" />
            {languages.map((item, index) => (
              <p key={index}>
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
