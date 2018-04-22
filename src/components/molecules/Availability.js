import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { FadeIn } from '../atoms/Animations'
import './Availability.scss'

const Availability = ({ meta, hide }) => {
  const { availability, social } = meta

  const available = `👔 Available for new projects. <a href="${
    social.Email
  }">Let’s talk</a>!`
  const unavailable = 'Not available for new projects.'

  return (
    <Fragment>
      {!hide && (
        <FadeIn>
          <aside
            className={
              availability
                ? 'availability available'
                : 'availability unavailable'
            }
          >
            <p
              dangerouslySetInnerHTML={{
                __html: availability ? available : unavailable,
              }}
            />
          </aside>
        </FadeIn>
      )}
    </Fragment>
  )
}

Availability.propTypes = {
  meta: PropTypes.object,
  hide: PropTypes.bool,
}

export default Availability
