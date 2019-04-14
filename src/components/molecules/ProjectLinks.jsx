import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import Button from '../atoms/Button'
import LinkIcon from '../atoms/LinkIcon'

import icons from '../atoms/Icons.module.scss'
import styles from './ProjectLinks.module.scss'

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
                <Button href={url} data-testid="link">
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
