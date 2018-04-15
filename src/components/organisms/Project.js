import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'
import Helmet from 'react-helmet'
import ReactMarkdown from 'react-markdown'
import Content from '../atoms/Content'
import FullWidth from '../atoms/FullWidth'
import ProjectTechstack from '../molecules/ProjectTechstack'
import ProjectLinks from '../molecules/ProjectLinks'
import { Index } from '../atoms/Icons'
import images from '../../images'
import './Project.scss'

const Project = ({ pathContext }) => {
  const project = pathContext
  const {
    title,
    img,
    img_more,
    description,
    links,
    techstack,
    next,
    previous,
  } = project

  return <Fragment>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Helmet>

      <main className="screen screen--project">
        <article className="project">
          <Content>
            <h1 className="project__title">{title}</h1>
            <ReactMarkdown source={description} escapeHtml={false} className="project__description" />

            <FullWidth>
              <img className="project__image" src={images[img]} alt={title} />
            </FullWidth>

            {!!img_more && <FullWidth>
                {img_more.map(key => (
                  <img
                    key={key}
                    className="project__image"
                    src={images[key]}
                    alt={title}
                  />
                ))}
              </FullWidth>}

            <footer className="project__meta">
              {!!techstack && <ProjectTechstack techstack={techstack} />}
              {!!links && <ProjectLinks links={links} />}
            </footer>
          </Content>
        </article>

        <nav className="project__nav full-width">
          {previous && <div className="project__nav__item">
              <Link className="project__nav__link prev" to={previous.slug}>
                <img className="project__image project__nav__image" src={images[previous.img]} alt={previous.title} />
                <h1 className="project__nav__title">{previous.title}</h1>
              </Link>
            </div>}
          <Link className="project__nav__index" title="Back to projects" to={'/'}>
            <Index />
          </Link>
          {next && <div className="project__nav__item">
              <Link className="project__nav__link next" to={next.slug}>
                <img className="project__image project__nav__image" src={images[next.img]} alt={next.title} />
                <h1 className="project__nav__title">{next.title}</h1>
              </Link>
            </div>}
        </nav>
      </main>
    </Fragment>
}

Project.propTypes = {
  pathContext: PropTypes.object,
}

export default Project
