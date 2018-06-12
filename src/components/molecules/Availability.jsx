import React, { Fragment, PureComponent } from 'react'
import PropTypes from 'prop-types'
import { MoveIn } from '../atoms/Animations'
import styles from './Availability.module.scss'

class Availability extends PureComponent {
  constructor(props) {
    super(props)
  }

  render() {
    const { availability } = this.props.meta
    const { status, available, unavailable } = availability

    return (
      <Fragment>
        {!this.props.hide && (
          <MoveIn>
            <aside
              className={
                status
                  ? `${styles.availability} ${styles.available}`
                  : `${styles.availability} ${styles.unavailable}`
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
  }
}

Availability.propTypes = {
  meta: PropTypes.object,
  hide: PropTypes.bool
}

export default Availability
