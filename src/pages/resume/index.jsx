import React from 'react'
import shortid from 'shortid'
import SEO from '../../components/atoms/SEO'
import Icon from '../../components/atoms/Icon'
import { useResume } from '../../hooks/use-resume'
import styles from './index.module.css'
import Header from './Header'
import ResumeItem from './ResumeItem'

export default function Resume() {
  const { education, work, awards } = useResume()

  return (
    <>
      <SEO />

      <div className={styles.resume}>
        <Header />

        <div>
          <h3 className={styles.subTitle}>
            <Icon name="Briefcase" />
            Work
          </h3>
        </div>
        <div>
          {work.map((workPlace) => (
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
          {awards.map((award) => (
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
          {education.map((eduPlace) => (
            <ResumeItem key={shortid.generate()} eduPlace={eduPlace} />
          ))}
        </div>
      </div>
    </>
  )
}
