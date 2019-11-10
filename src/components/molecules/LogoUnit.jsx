import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql, useStaticQuery } from 'gatsby'
import posed from 'react-pose'
import { moveInBottom } from '../atoms/Transitions'
import { ReactComponent as Logo } from '../../images/logo.svg'
import styles from './LogoUnit.module.scss'

const query = graphql`
  query {
    metaYaml {
      title
      tagline
    }
  }
`

LogoUnit.propTypes = {
  minimal: PropTypes.bool
}

export default function LogoUnit({ minimal }) {
  const data = useStaticQuery(query)
  const Animation = posed.div(moveInBottom)
  const { title, tagline } = data.metaYaml

  return (
    <Animation>
      <Link className={minimal ? styles.minimal : styles.logounit} to={'/'}>
        <Logo className={styles.logo} />
        <h1 className={`p-name ${styles.title}`}>{title.toLowerCase()}</h1>
        <p className={`p-job-title ${styles.description}`}>
          {tagline.toLowerCase()}
        </p>
      </Link>
    </Animation>
  )
}
