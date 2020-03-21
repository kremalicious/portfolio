import React from 'react'
import PropTypes from 'prop-types'
import Button from '../atoms/Button'
import Icon from '../atoms/Icon'
import styles from './ProjectLinks.module.css'

ProjectLinks.propTypes = {
  links: PropTypes.array
}

export default function ProjectLinks({ links }) {
  return (
    <div className={styles.projectLinks}>
      <h3 className={styles.title}>
        Links <span>Learn more on the interwebz.</span>
      </h3>

      <ul>
        {links.map((link) => {
          const { title, url, icon } = link

          return (
            <li key={title}>
              <Button href={url} data-testid="link">
                <Icon name={icon ? icon : title} />
                {title}
              </Button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
