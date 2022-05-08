import React from 'react'
import PropTypes from 'prop-types'

// https://featherstyles.com
// import * as Feather from '@kremalicious/react-feather'
import {
  ArrowDownCircle,
  Edit,
  GitHub,
  Twitter,
  Rss,
  Sun,
  Moon,
  Compass,
  FileText,
  Key,
  Image,
  Mail,
  MapPin,
  Globe,
  Briefcase,
  Award,
  BookOpen,
  Star,
  Info,
  Dribbble
} from '@kremalicious/react-feather'
import { icon } from './Icon.module.css'

export default function Icon({ name, ...props }) {
  const components = {
    Dribbble,
    Email: Mail,
    Link: Compass,
    Download: ArrowDownCircle,
    'Info & Download': ArrowDownCircle,
    Styleguide: FileText,
    Blog: Edit,
    Keybase: Key,
    ArrowDownCircle,
    Edit,
    GitHub,
    Twitter,
    Rss,
    Sun,
    Moon,
    Compass,
    FileText,
    Key,
    Image,
    Mail,
    MapPin,
    Globe,
    Briefcase,
    Award,
    BookOpen,
    Star,
    Info
  }

  const IconMapped = components[name]
  // const IconComp = Feather[name]
  if (!IconMapped) return null

  return <IconMapped className={icon} {...props} />
}

Icon.propTypes = {
  name: PropTypes.string.isRequired
}
