import React from 'react'
import PropTypes from 'prop-types'
import Icon from '../../atoms/Icon'
import ResumeItem, { ResumeItemContentProps } from './ResumeItem'
import { subTitle } from './ResumeSection.module.css'

export default function ResumeSection({ section }) {
  return (
    <>
      <h3 className={subTitle}>
        <Icon name={section.icon} />
        {section.name}
      </h3>
      <div>
        {section.content.map((content, i) => (
          <ResumeItem key={i} content={content} />
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
