import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet/es/Helmet'
import Header from '../molecules/Header'
import Content from '../atoms/Content'
import FullWidth from '../atoms/FullWidth'
import images from '../../images'
import './Project.css'

const Project = ({ project }) => {
  const title = project.title
  const img = project.img
  const description = project.description
  const links = project.links

  return (
    <Fragment>
      <Helmet>
        <title>{title}</title>
      </Helmet>

      <Header minimal />

      <main className="screen screen--project">
        <article className="project">
          <Content>
            <h1 className="project__title">{title}</h1>
            <p className="project__description">{description}</p>

            <FullWidth>
              <img className="project__image" src={images[img]} alt={title} />
            </FullWidth>

            <ul>
              {!!links && Object.keys(links).map(key => (
                <li key={key}>
                  <a href={links[key]}>{key}</a>
                </li>
              ))}
            </ul>
          </Content>
        </article>
      </main>
    </Fragment>
  )
}

Project.propTypes = {
  project: PropTypes.object
}

export default Project
