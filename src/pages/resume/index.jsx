import React from 'react'
import shortid from 'shortid'
import SEO from '../../components/atoms/SEO'
import { useResume } from '../../hooks/use-resume'
import styles from './index.module.css'
import Header from './Header'
import ResumeSection from './ResumeSection'

export default function Resume() {
  const { education, work, awards } = useResume()
  const items = [
    { content: work, name: 'Work', icon: 'Briefcase' },
    { content: awards, name: 'Awards', icon: 'Award' },
    { content: education, name: 'Education', icon: 'BookOpen' }
  ]

  return (
    <>
      <SEO />

      <div className={styles.resume}>
        <Header />

        {items.map((item) => (
          <ResumeSection key={shortid.generate()} section={item} />
        ))}
      </div>
    </>
  )
}
