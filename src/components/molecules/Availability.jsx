import React, { Fragment, PureComponent } from 'react'
import PropTypes from 'prop-types'
import { MoveIn } from '../atoms/Animations'
import './Availability.scss'

class Availability extends PureComponent {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    if (this.props.meta.availability.status === true) {
      let supportsPassive = false

      try {
        const opts = Object.defineProperty({}, 'passive', {
          get: function() {
            supportsPassive = true
          },
        })
        window.addEventListener('test', null, opts)
      } catch (e) {
        return e
      }

      window.addEventListener(
        'scroll',
        this.handleScroll,
        supportsPassive ? { passive: true } : false
      )
    }
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  }

  handleScroll = () => {
    let timeout
    const footer = document.getElementsByClassName('footer')[0]
    const availability = document.getElementsByClassName('availability')[0]

    if (!timeout) {
      timeout = setTimeout(function() {
        timeout = null

        if (footer.getBoundingClientRect().top <= window.innerHeight) {
          availability.style.opacity = 0
          window.removeEventListener('scroll', this.handleScroll)
        } else {
          availability.style.opacity = 1
        }
      }, 300)
    }
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
                status ? 'availability available' : 'availability unavailable'
              }
            >
              <p
                dangerouslySetInnerHTML={{
                  __html: status ? available : unavailable,
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
  hide: PropTypes.bool,
}

export default Availability
