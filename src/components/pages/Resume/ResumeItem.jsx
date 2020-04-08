import React from 'react'
import PropTypes from 'prop-types'
import remark from 'remark'
import remark2react from 'remark-react'
import parse from 'remark-parse'
import html from 'remark-html'
import breaks from 'remark-breaks'
import styles from './ResumeItem.module.css'

const markdownOutput = (text) =>
  remark()
    .use(parse, { gfm: true, commonmark: true, pedantic: true })
    .use(html)
    .use(breaks)
    .use(remark2react)
    .processSync(text).result

function normalizeData(content) {
  const title = content.company || content.title || content.institution
  const subTitle = content.position || content.awarder || content.area
  const text = content.summary || content.studyType
  const startDate = content.date || content.startDate
  const endDate = content.endDate

  return { title, subTitle, text, startDate, endDate }
}

export default function ResumeItem({ content }) {
  const { title, subTitle, text, startDate, endDate } = normalizeData(content)
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

export const ResumeItemContentProps = PropTypes.oneOfType([
  PropTypes.shape({
    startDate: PropTypes.string.isRequired,
    endDate: PropTypes.string,
    company: PropTypes.string.isRequired,
    position: PropTypes.string.isRequired,
    summary: PropTypes.string
  }),
  PropTypes.shape({
    startDate: PropTypes.string.isRequired,
    endDate: PropTypes.string,
    institution: PropTypes.string.isRequired,
    area: PropTypes.string.isRequired,
    studyType: PropTypes.string
  }),
  PropTypes.shape({
    date: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    awarder: PropTypes.string.isRequired,
    summary: PropTypes.string
  })
])

ResumeItem.propTypes = {
  content: ResumeItemContentProps
}
