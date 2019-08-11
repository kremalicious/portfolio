import React from 'react'
import shortid from 'shortid'
import SEO from '../../components/atoms/SEO'
import LinkIcon from '../../components/atoms/LinkIcon'
import { useResume } from '../../hooks/use-resume'
import styles from './index.module.scss'
import ResumeItem from './ResumeItem'

export default function Resume() {
  const { basics, education, languages, work } = useResume()

  return (
    <>
      <SEO />

      <div className={styles.resume}>
        <header>
          <p>Résumé</p>
          <h1 className={styles.title}>{basics.name}</h1>
          <h2 className={styles.label}>{basics.label}</h2>
        </header>

        <div>
          <ul className={styles.contact}>
            <li>
              <a href={basics.website}>
                <LinkIcon type="website" />
                {basics.website.replace('https://', '')}
              </a>
            </li>
            <li>
              <LinkIcon type="Email" />
              {basics.email}
            </li>
            <li>
              <LinkIcon type="Info" />
              {basics.location.city}
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
