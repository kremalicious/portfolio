import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import ReactMarkdown from 'react-markdown'
import Content from '../atoms/Content'
import FullWidth from '../atoms/FullWidth'
import ProjectTechstack from '../molecules/ProjectTechstack'
import ProjectLinks from '../molecules/ProjectLinks'
import ProjectNav from '../molecules/ProjectNav'
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

  return (
    <Fragment>
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

            {!!img_more &&
              <FullWidth>
                {img_more.map(key => (
                  <img
                    key={key}
                    className="project__image"
                    src={images[key]}
                    alt={title}
                  />
                ))}
              </FullWidth>
            }

            <footer className="project__meta">
              {!!techstack && <ProjectTechstack techstack={techstack} />}
              {!!links && <ProjectLinks links={links} />}
            </footer>
          </Content>
        </article>

        <ProjectNav previous={previous} next={next} />
      </main>
    </Fragment>
  )
}

Project.propTypes = {
  pathContext: PropTypes.object,
}

export default Project
