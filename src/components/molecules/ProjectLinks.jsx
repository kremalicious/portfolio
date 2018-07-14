import React from 'react'
import PropTypes from 'prop-types'

import Button from '../atoms/Button'
import Link from '../svg/Link'
import Download from '../svg/Download'
import Info from '../svg/Info'
import Styleguide from '../svg/Styleguide'
import GitHub from '../svg/Github'
import Dribbble from '../svg/Dribbble'

import icons from '../atoms/Icons.module.scss'
import styles from './ProjectLinks.module.scss'

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
  <div className={styles.projectLinks}>
    <h3 className={styles.title}>
      Links <span>Learn more on the interwebz.</span>
    </h3>

    <ul>
      {links.map(link => {
        const { title, url } = link

        return (
          <li key={title}>
            <Button href={url}>
              <LinkIcon title={title} className={icons.icon} />
              {title}
            </Button>
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
