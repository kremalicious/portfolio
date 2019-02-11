import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import Button from '../atoms/Button'
import { ReactComponent as Link } from '../../images/link.svg'
import { ReactComponent as Download } from '../../images/download.svg'
import { ReactComponent as Info } from '../../images/info.svg'
import { ReactComponent as Styleguide } from '../../images/styleguide.svg'
import { ReactComponent as GitHub } from '../../images/github.svg'
import { ReactComponent as Dribbble } from '../../images/dribbble.svg'

import icons from '../atoms/Icons.module.scss'
import styles from './ProjectLinks.module.scss'

const LinkIcon = ({ title, type, ...props }) => {
  let typeOrTitle = type ? type : title

  switch (typeOrTitle) {
    case 'website':
    case 'Link':
      return <Link {...props} />
    case 'github':
    case 'GitHub':
      return <GitHub {...props} />
    case 'dribbble':
    case 'Dribbble':
      return <Dribbble {...props} />
    case 'info':
    case 'Info':
      return <Info {...props} />
    case 'download':
    case 'Download':
      return <Download {...props} />
    case 'styleguide':
    case 'Styleguide':
      return <Styleguide {...props} />
    default:
      return null
  }
}

LinkIcon.propTypes = {
  title: PropTypes.string,
  type: PropTypes.string
}

export default class ProjectLinks extends PureComponent {
  static propTypes = {
    links: PropTypes.array
  }

  render() {
    return (
      <div className={styles.projectLinks}>
        <h3 className={styles.title}>
          Links <span>Learn more on the interwebz.</span>
        </h3>

        <ul>
          {this.props.links.map(link => {
            const { title, url, type } = link

            return (
              <li key={title}>
                <Button href={url}>
                  <LinkIcon title={title} type={type} className={icons.icon} />
                  {title}
                </Button>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
}
