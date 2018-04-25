import React from 'react'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'
import images from '../../images'
import { ReactComponent as Index } from '../../images/index.svg'

import '../atoms/Icons.scss'
import './ProjectNav.scss'

const ProjectNav = ({ previous, next }) => (
  <nav className="project__nav full-width">
    {previous && (
      <div className="project__nav__item">
        <Link className="project__nav__link prev" to={`/${previous.slug}`}>
          <img
            className="project__nav__image"
            src={images[previous.img]}
            alt={previous.title}
          />
          <h1 className="project__nav__title">{previous.title}</h1>
        </Link>
      </div>
    )}
    <Link
      className="project__nav__index"
      title="Back to projects"
      to={'/#projects'}
    >
      <Index className="icon" />
    </Link>
    {next && (
      <div className="project__nav__item">
        <Link className="project__nav__link next" to={`/${next.slug}`}>
          <img
            className="project__nav__image"
            src={images[next.img]}
            alt={next.title}
          />
          <h1 className="project__nav__title">{next.title}</h1>
        </Link>
      </div>
    )}
  </nav>
)

ProjectNav.propTypes = {
  previous: PropTypes.object,
  next: PropTypes.object,
}

export default ProjectNav
