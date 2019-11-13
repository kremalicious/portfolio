import React from 'react'
import PropTypes from 'prop-types'

// https://featherstyles.com
import * as Feather from 'react-feather'
import { ReactComponent as Dribbble } from '../../images/dribbble.svg'
import styles from './Icon.module.scss'

const Icon = ({ name, ...props }) => {
  const components = {
    Dribbble,
    Link: Feather.Compass,
    Download: Feather.ArrowDownCircle,
    'Info & Download': Feather.ArrowDownCircle,
    Styleguide: Feather.FileText,
    Blog: Feather.Edit,
    Keybase: Feather.Key
  }

  const IconMapped = components[name]
  const Icon = Feather[name]

  if (!IconMapped && !Icon) return null

  return IconMapped ? (
    <IconMapped className={styles.icon} {...props} />
  ) : (
    <Icon className={styles.icon} {...props} />
  )
}

Icon.propTypes = {
  name: PropTypes.string.isRequired
}

export default Icon
