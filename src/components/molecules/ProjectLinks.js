import React from 'react'
import PropTypes from 'prop-types'
import { Chain, GitHub, Dribbble } from '../atoms/Icons'
import './ProjectLinks.scss'

const LinkIcon = ({ title }) => {
  if (title === 'Link') {
    return <Chain />
  } else if (title === 'GitHub') {
    return <GitHub />
  } else if (title === 'Dribbble') {
    return <Dribbble />
  } else {
    return null
  }
}

const ProjectLinks = ({ links }) => (
  <ul className="projectlinks">
    {!!links &&
      Object.keys(links).map(key => {
        if (links[key]) {
          return <li key={key}>
              <a href={links[key]}>
                <LinkIcon title={key} />
                {key}
              </a>
            </li>
        }
      })}
  </ul>
)

ProjectLinks.propTypes = {
  links: PropTypes.object,
}

export default ProjectLinks
