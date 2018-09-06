import React, { Fragment, PureComponent } from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'
import { MoveIn } from '../atoms/Animations'
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
            <Fragment>
              {!this.props.hide && (
                <MoveIn>
                  <aside
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
                  </aside>
                </MoveIn>
              )}
            </Fragment>
          )
        }}
      />
    )
  }
}
