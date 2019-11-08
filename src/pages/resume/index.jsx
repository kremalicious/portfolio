import React from 'react'
import shortid from 'shortid'
import SEO from '../../components/atoms/SEO'
import LinkIcon from '../../components/atoms/LinkIcon'
import { useResume } from '../../hooks/use-resume'
import styles from './index.module.scss'
import ResumeItem from './ResumeItem'

export default function Resume() {
  const { basics, education, languages, work, awards } = useResume()
  const { name, label, email, website, location } = basics

  return (
    <>
      <SEO />

      <div className={styles.resume}>
        <header>
          <p>Résumé</p>
          <h1 className={styles.title}>{name}</h1>
          <h2 className={styles.label}>{label}</h2>
        </header>

        <div>
          <ul className={styles.contact}>
            <li>
              <a href={website}>
                <LinkIcon type="website" />
                Portfolio
              </a>
            </li>
            <li>
              <LinkIcon type="Email" />
              <a href={`mailto:${email}`}>Email</a>
            </li>
            <li>
              <LinkIcon type="Info" />
              {location.city}, {location.countryCode}
            </li>
            <li>
              <LinkIcon type="Info" />
              {languages.map(item => (
                <span
                  key={item.language}
                >{`${item.language} (${item.fluency})`}</span>
              ))}
            </li>
          </ul>
        </div>

        <div>
          <h3 className={styles.subTitle}>Work</h3>
        </div>
        <div>
          {work.map(workPlace => (
            <ResumeItem key={shortid.generate()} workPlace={workPlace} />
          ))}
        </div>

        <div>
          <h3 className={styles.subTitle}>Awards</h3>
        </div>
        <div>
          {awards.map(award => (
            <ResumeItem key={shortid.generate()} award={award} />
          ))}
        </div>

        <div>
          <h3 className={styles.subTitle}>Education</h3>
        </div>
        <div>
          {education.map(eduPlace => (
            <ResumeItem key={shortid.generate()} eduPlace={eduPlace} />
          ))}
        </div>
      </div>
    </>
  )
}
