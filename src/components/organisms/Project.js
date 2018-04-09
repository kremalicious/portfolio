import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import ReactMarkdown from 'react-markdown'
import Content from '../atoms/Content'
import FullWidth from '../atoms/FullWidth'
import ProjectLinks from '../molecules/ProjectLinks'
import images from '../../images'
import './Project.scss'

const Project = props => {
  const project = props.pathContext
  const title = project.title
  const img = project.img
  const img_more = project.img_more
  const description = project.description
  const links = project.links
  const techstack = project.techstack

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

            <FullWidth>
              {!!img_more &&
                img_more.map(key => (
                  <img
                    key={key}
                    className="project__image"
                    src={images[key]}
                    alt={title}
                  />
                ))}
            </FullWidth>

            <footer className="project__meta">
              <div className="project__techstack">
                <h3 className="project__meta__title">
                  Technologies <span>
                    The tech stack I was involved with.
                  </span>
                </h3>
                <ul>
                  {!!techstack &&
                    techstack.map(tech => <li key={tech}>{tech}</li>)}
                </ul>
              </div>

              <div className="project__links">
                <h3 className="project__meta__title">
                  Links <span>See the project live on the interwebz.</span>
                </h3>
                <ProjectLinks links={links} />
              </div>
            </footer>
          </Content>
        </article>
      </main>
    </Fragment>
}

Project.propTypes = {
  pathContext: PropTypes.object,
}

export default Project
