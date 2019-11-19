import React from 'react'
import PropTypes from 'prop-types'
import remark from 'remark'
import remark2react from 'remark-react'
import parse from 'remark-parse'
import html from 'remark-html'
import breaks from 'remark-breaks'
import styles from './ResumeItem.module.scss'

const markdownOutput = text =>
  remark()
    .use(parse, { gfm: true, commonmark: true, pedantic: true })
    .use(html)
    .use(breaks)
    .use(remark2react)
    .processSync(text).contents

function normalizeData(workPlace, eduPlace, award) {
  const title = workPlace
    ? workPlace.company
    : award
    ? award.title
    : eduPlace
    ? eduPlace.institution
    : null

  const subTitle = workPlace
    ? workPlace.position
    : award
    ? award.awarder
    : eduPlace
    ? eduPlace.area
    : null

  const text = workPlace
    ? workPlace.summary
    : award && award.summary
    ? award.summary
    : eduPlace
    ? eduPlace.studyType
    : null

  const startDate = award
    ? award.date
    : (workPlace && workPlace.startDate) || (eduPlace && eduPlace.startDate)

  const endDate = award
    ? null
    : (workPlace && workPlace.endDate) || (eduPlace && eduPlace.endDate)

  return { title, subTitle, text, startDate, endDate }
}

export default function ResumeItem({ workPlace, eduPlace, award }) {
  const { title, subTitle, text, startDate, endDate } = normalizeData(
    workPlace,
    eduPlace,
    award
  )

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
      {text && markdownOutput(text)}
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
  }),
  award: PropTypes.shape({
    date: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    awarder: PropTypes.string.isRequired,
    summary: PropTypes.string
  })
}
