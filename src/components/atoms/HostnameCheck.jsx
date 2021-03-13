import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import { hostnameInfo } from './HostnameCheck.module.css'

HostnameCheck.propTypes = {
  allowedHosts: PropTypes.array.isRequired
}

export default function HostnameCheck({ allowedHosts }) {
  // default to true so SSR builds never show the banner
  const [isAllowedHost, setIsAllowedHost] = useState(true)

  const checkAllowedHost = () => {
    if (typeof window !== 'undefined' && window.location) {
      return allowedHosts.includes(window.location.hostname)
    }
  }

  useEffect(() => {
    const isAllowedHost = checkAllowedHost()
    setIsAllowedHost(isAllowedHost)
  }, [])

  return !isAllowedHost ? (
    <>
      <Helmet>
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>
      <aside className={hostnameInfo}>
        <p>{`Hi there 👋. Please note that only the code and documentation of this
          site are open source. But my logo and the combination of typography,
          colors, and layout making up my brand identity are not. Don't just
          clone, do a remix.`}</p>
      </aside>
    </>
  ) : null
}
