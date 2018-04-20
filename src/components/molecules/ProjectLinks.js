import React from 'react'
import PropTypes from 'prop-types'
import { OutboundLink } from 'gatsby-plugin-google-analytics'
import { Chain, GitHub, Dribbble, Info, Download } from '../atoms/Icons'
import './ProjectLinks.scss'

const LinkIcon = ({ title }) => {
  switch (title) {
    case 'Link':
      return <Chain />
    case 'GitHub':
      return <GitHub />
    case 'Dribbble':
      return <Dribbble />
    case 'Info':
      return <Info />
    case 'Download':
      return <Download />
    default:
      return null
  }
}

const ProjectLinks = ({ links }) => (
  <div className="project__links">
    <h3 className="project__meta__title">
      Links <span>Learn more on the interwebz.</span>
    </h3>

    <ul>
      {links.map(link => {
        const { title, url } = link

        return (
          <li key={title}>
            <OutboundLink href={url}>
              <LinkIcon title={title} />
              {title}
            </OutboundLink>
          </li>
        )
      })}
    </ul>
  </div>
)

ProjectLinks.propTypes = {
  links: PropTypes.array,
}

export default ProjectLinks
