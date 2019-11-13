import React from 'react'
import PropTypes from 'prop-types'

// https://featherstyles.com
import {
  Star,
  FileText,
  Compass,
  ArrowDownCircle,
  Info,
  GitHub,
  Mail,
  Feather,
  Twitter,
  Image,
  Moon,
  Sun,
  Key
} from 'react-feather'
import { ReactComponent as Dribbble } from '../../images/dribbble.svg'
import styles from './Icon.module.scss'

const Icon = ({ name, ...props }) => {
  switch (name) {
    case 'website':
    case 'Link':
      return <Compass className={styles.icon} {...props} />
    case 'github':
    case 'GitHub':
      return <GitHub className={styles.icon} {...props} />
    case 'dribbble':
    case 'Dribbble':
      return <Dribbble className={styles.icon} {...props} />
    case 'info':
    case 'Info':
      return <Info className={styles.icon} {...props} />
    case 'download':
    case 'Download':
      return <ArrowDownCircle className={styles.icon} {...props} />
    case 'styleguide':
    case 'Styleguide':
      return <FileText className={styles.icon} {...props} />
    case 'Email':
      return <Mail className={styles.icon} {...props} />
    case 'Blog':
      return <Feather className={styles.icon} {...props} />
    case 'Twitter':
      return <Twitter className={styles.icon} {...props} />
    case 'Keybase':
      return <Key className={styles.icon} {...props} />
    case 'star':
      return <Star className={styles.icon} {...props} />
    case 'image':
      return <Image className={styles.icon} {...props} />
    case 'day':
      return <Sun className={styles.icon} {...props} />
    case 'night':
      return <Moon className={styles.icon} {...props} />
    default:
      return null
  }
}

Icon.propTypes = {
  name: PropTypes.string.isRequired
}

export default Icon
