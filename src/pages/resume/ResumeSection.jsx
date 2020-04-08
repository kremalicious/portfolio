import React from 'react'
import PropTypes from 'prop-types'
import shortid from 'shortid'
import Icon from '../../components/atoms/Icon'
import ResumeItem, { ResumeItemContentProps } from './ResumeItem'
import styles from './ResumeSection.module.css'

export default function ResumeSection({ section }) {
  return (
    <>
      <h3 className={styles.subTitle}>
        <Icon name={section.icon} />
        {section.name}
      </h3>
      <div>
        {section.content.map((content) => (
          <ResumeItem key={shortid.generate()} content={content} />
        ))}
      </div>
    </>
  )
}

ResumeSection.propTypes = {
  section: PropTypes.shape({
    name: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    content: PropTypes.arrayOf(ResumeItemContentProps).isRequired
  }).isRequired
}
