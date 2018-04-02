import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import Header from '../molecules/Header'
import Content from '../atoms/Content'

const Project = ({ project }) => {
  const title = project.title
  const img = project.img
  const description = project.description
  const links = project.links

  return (
    <Fragment>
      <Header minimal />
      <main className="screen screen--project">
        <Content>
          <h1>{title}</h1>
          <p>{description}</p>

          {img}

          <ul>
            {!!links && Object.keys(links).map(key => (
              <li key={key}>
                <a href={links[key]}>{key}</a>
              </li>
            ))}
          </ul>
        </Content>
      </main>
    </Fragment>
  )
}

Project.propTypes = {
  project: PropTypes.object
}

export default Project
