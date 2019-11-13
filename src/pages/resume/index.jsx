import React from 'react'
import shortid from 'shortid'
import SEO from '../../components/atoms/SEO'
import Icon from '../../components/atoms/Icon'
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

        <div>
          <h3 className={styles.subTitle}>
            <Icon name="Briefcase" />
            Work
          </h3>
        </div>
        <div>
          {work.map(workPlace => (
            <ResumeItem key={shortid.generate()} workPlace={workPlace} />
          ))}
        </div>

        <div>
          <h3 className={styles.subTitle}>
            <Icon name="Award" />
            Awards
          </h3>
        </div>
        <div>
          {awards.map(award => (
            <ResumeItem key={shortid.generate()} award={award} />
          ))}
        </div>

        <div>
          <h3 className={styles.subTitle}>
            <Icon name="BookOpen" />
            Education
          </h3>
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
