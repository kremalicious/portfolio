import React from 'react'
import PropTypes from 'prop-types'
import Content from '../atoms/Content'

const Project = ({ project }) => {
  const title = project.title
  const img = project.img
  const description = project.description
  const links = project.links

  return (
    <main className="screen screen--project">
      <Content>
        <h1>{title}</h1>
        <p>{description}</p>

        {img}

        <ul>
          {Object.keys(links).map(key => (
            <li key={key}>
              <a href={links[key]}>{key}</a>
            </li>
          ))}
        </ul>
      </Content>
    </main>
  )
}

Project.propTypes = {
  project: PropTypes.object
}

export default Project
