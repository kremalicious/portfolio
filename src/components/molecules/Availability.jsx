import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'
import posed, { PoseGroup } from 'react-pose'

import styles from './Availability.module.scss'

const query = graphql`
  query {
    dataYaml {
      availability {
        status
        available
        unavailable
      }
    }
  }
`

const Animation = posed.aside({
  enter: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring' }
  },
  exit: {
    opacity: 0,
    y: '2rem',
    transition: { type: 'spring' }
  }
})

export default class Availability extends PureComponent {
  static propTypes = { hide: PropTypes.bool }

  render() {
    return (
      <StaticQuery
        query={query}
        render={data => {
          const { availability } = data.dataYaml
          const { status, available, unavailable } = availability

          return (
            !this.props.hide && (
              <PoseGroup animateOnMount={true}>
                <Animation
                  className={
                    status
                      ? `${styles.availability} ${styles.available}`
                      : `${styles.availability}`
                  }
                >
                  <p
                    dangerouslySetInnerHTML={{
                      __html: status ? available : unavailable
                    }}
                  />
                </Animation>
              </PoseGroup>
            )
          )
        }}
      />
    )
  }
}
