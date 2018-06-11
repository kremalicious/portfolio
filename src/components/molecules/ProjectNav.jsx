import React from 'react'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'
import Img from 'gatsby-image'
import FullWidth from '../atoms/FullWidth'
import { ReactComponent as Index } from '../../images/index.svg'

import icons from '../atoms/Icons.module.scss'
import styles from './ProjectNav.module.scss'

const ProjectNavLink = ({ previous, next }) => {
  const slug = previous ? previous.slug : next.slug
  const title = previous ? previous.title : next.title
  const img = previous ? previous.img : next.img

  return (
    <div className={styles.item}>
      <Link className={styles.link + ' prev'} to={slug}>
        <Img
          className={styles.image}
          sizes={img.childImageSharp.sizes}
          alt={title}
        />
        <h1 className={styles.title}>{title}</h1>
      </Link>
    </div>
  )
}

const ProjectNav = ({ previous, next }) => (
  <FullWidth>
    <nav className={styles.projectNav}>
      {previous && <ProjectNavLink previous={previous} />}
      <Link className={styles.index} title="Back to projects" to={'/'}>
        <Index className={icons.icon} />
      </Link>
      {next ? (
        <ProjectNavLink next={next} />
      ) : (
        <div className={`${styles.item} ${styles.itemEnd}`}>
          <div className={styles.end}>
            <h3>This is the end</h3>
            <p>I would rather not show you my websites from 1999.</p>
          </div>
        </div>
      )}
    </nav>
  </FullWidth>
)

ProjectNavLink.propTypes = {
  previous: PropTypes.object,
  next: PropTypes.object
}

ProjectNav.propTypes = {
  previous: PropTypes.object,
  next: PropTypes.object
}

export default ProjectNav
