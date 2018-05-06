import React from 'react'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'
import Img from 'gatsby-image'
import { ReactComponent as Index } from '../../images/index.svg'

import '../atoms/Icons.scss'
import './ProjectNav.scss'

const ProjectNav = ({ previous, next }) => (
  <nav className="project__nav full-width">
    {previous && (
      <div className="project__nav__item">
        <Link className="project__nav__link prev" to={previous.slug}>
          <Img
            className="project__nav__image"
            sizes={previous.img.childImageSharp.sizes}
            alt={previous.title}
          />
          <h1 className="project__nav__title">{previous.title}</h1>
        </Link>
      </div>
    )}
    <Link
      className="project__nav__index"
      title="Back to projects"
      to={'/'}
    >
      <Index className="icon" />
    </Link>
    {next ? (
      <div className="project__nav__item">
        <Link className="project__nav__link next" to={next.slug}>
          <Img
            className="project__nav__image"
            sizes={next.img.childImageSharp.sizes}
            alt={next.title}
          />
          <h1 className="project__nav__title">{next.title}</h1>
        </Link>
      </div>
    ) : (
        <div className="project__nav__item project__nav__item--end">
          <div className="project__nav__end">
            <h3>This is the end</h3>
            <p>I would rather not show you my websites from 1999.</p>
          </div>
        </div>
    )}
  </nav>
)

ProjectNav.propTypes = {
  previous: PropTypes.object,
  next: PropTypes.object,
}

export default ProjectNav
