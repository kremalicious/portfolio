import React from 'react'
import PropTypes from 'prop-types'
import Networks from '../molecules/Networks'
import Availability from '../molecules/Availability'

import LogoUnit from '../molecules/LogoUnit'
import { header, minimal as styleMinimal } from './Header.module.css'
import { useMeta } from '../../hooks/use-meta'

Header.propTypes = {
  minimal: PropTypes.bool,
  hide: PropTypes.bool
}

export default function Header({ minimal, hide }) {
  const { availability } = useMeta()

  return (
    <header className={minimal ? styleMinimal : header}>
      {!hide && (
        <>
          <LogoUnit minimal={minimal} />
          <Networks hide={minimal} />
          <Availability hide={minimal && !availability.status} />
        </>
      )}
    </header>
  )
}
