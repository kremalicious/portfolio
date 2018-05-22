import React from 'react'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'
import Img from 'gatsby-image'
import { ReactComponent as Index } from '../../images/index.svg'

import '../atoms/Icons.scss'
import './ProjectNav.scss'

const ProjectNavLink = ({ previous, next }) => {
  const slug = previous ? previous.slug : next.slug
  const title = previous ? previous.title : next.title
  const img = previous ? previous.img : next.img

  return (
    <div className="project__nav__item">
      <Link className="project__nav__link prev" to={slug}>
        <Img
          className="project__nav__image"
          sizes={img.childImageSharp.sizes}
          alt={title}
        />
        <h1 className="project__nav__title">{title}</h1>
      </Link>
    </div>
  )
}

const ProjectNav = ({ previous, next }) => (
  <nav className="project__nav full-width">
    {previous && <ProjectNavLink previous={previous} />}
    <Link className="project__nav__index" title="Back to projects" to={'/'}>
      <Index className="icon" />
    </Link>
    {next ? (
      <ProjectNavLink next={next} />
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

ProjectNavLink.propTypes = {
  previous: PropTypes.object,
  next: PropTypes.object
}

ProjectNav.propTypes = {
  previous: PropTypes.object,
  next: PropTypes.object
}

export default ProjectNav
