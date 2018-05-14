import React from 'react'
import PropTypes from 'prop-types'
import { OutboundLink } from 'gatsby-plugin-google-analytics'

import { ReactComponent as Link } from '../../images/link.svg'
import { ReactComponent as Download } from '../../images/download.svg'
import { ReactComponent as Info } from '../../images/info.svg'
import { ReactComponent as Styleguide } from '../../images/styleguide.svg'
import { ReactComponent as GitHub } from '../../images/github.svg'
import { ReactComponent as Dribbble } from '../../images/dribbble.svg'

import '../atoms/Icons.scss'
import './ProjectLinks.scss'

const LinkIcon = props => {
  switch (props.title) {
    case 'Link':
      return <Link {...props} />
    case 'GitHub':
      return <GitHub {...props} />
    case 'Dribbble':
      return <Dribbble {...props} />
    case 'Info':
      return <Info {...props} />
    case 'Download':
      return <Download {...props} />
    case 'Styleguide':
      return <Styleguide {...props} />
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
              <LinkIcon title={title} className="icon" />
              {title}
            </OutboundLink>
          </li>
        )
      })}
    </ul>
  </div>
)

ProjectLinks.propTypes = {
  links: PropTypes.array
}

export default ProjectLinks
