import React from 'react'
import PropTypes from 'prop-types'
import styles from './ResumeItem.module.scss'

export default function ResumeItem({ workPlace, eduPlace }) {
  const title = workPlace ? workPlace.company : eduPlace.institution
  const subTitle = workPlace ? workPlace.position : eduPlace.area
  const text = workPlace ? workPlace.summary : eduPlace.studyType
  const { startDate, endDate } = workPlace || eduPlace

  const dateStart = new Date(startDate).getFullYear()
  const dateEnd = endDate && new Date(endDate).getFullYear()
  const isSameYear = dateStart === dateEnd

  return (
    <div className={styles.resumeItem}>
      <span className={styles.time}>
        {dateStart}
        {dateEnd ? !isSameYear && `–${dateEnd}` : '–present'}{' '}
      </span>
      <h4 className={styles.title}>{title}</h4>
      <h5 className={styles.subTitle}>{subTitle}</h5>
      <p>
        <em>{text}</em>
      </p>
    </div>
  )
}

ResumeItem.propTypes = {
  workPlace: PropTypes.shape({
    startDate: PropTypes.string.isRequired,
    endDate: PropTypes.string,
    company: PropTypes.string.isRequired,
    position: PropTypes.string.isRequired,
    summary: PropTypes.string
  }),
  eduPlace: PropTypes.shape({
    startDate: PropTypes.string.isRequired,
    endDate: PropTypes.string,
    institution: PropTypes.string.isRequired,
    area: PropTypes.string.isRequired,
    studyType: PropTypes.string
  })
}
