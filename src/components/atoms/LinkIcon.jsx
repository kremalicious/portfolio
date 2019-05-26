import React from 'react'
import PropTypes from 'prop-types'

import { ReactComponent as Link } from '../../images/link.svg'
import { ReactComponent as Download } from '../../images/download.svg'
import { ReactComponent as Info } from '../../images/info.svg'
import { ReactComponent as Styleguide } from '../../images/styleguide.svg'
import { ReactComponent as GitHub } from '../../images/github.svg'
import { ReactComponent as Dribbble } from '../../images/dribbble.svg'
import { ReactComponent as Email } from '../../images/email.svg'
import { ReactComponent as Blog } from '../../images/blog.svg'
import { ReactComponent as Twitter } from '../../images/twitter.svg'
import { ReactComponent as Star } from '../../images/star.svg'

const LinkIcon = ({ title, type, ...props }) => {
  let typeOrTitle = type ? type : title

  switch (typeOrTitle) {
    case 'website':
    case 'Link':
      return <Link {...props} />
    case 'github':
    case 'GitHub':
      return <GitHub {...props} />
    case 'dribbble':
    case 'Dribbble':
      return <Dribbble {...props} />
    case 'info':
    case 'Info':
      return <Info {...props} />
    case 'download':
    case 'Download':
      return <Download {...props} />
    case 'styleguide':
    case 'Styleguide':
      return <Styleguide {...props} />
    case 'Email':
      return <Email {...props} />
    case 'Blog':
      return <Blog {...props} />
    case 'Twitter':
      return <Twitter {...props} />
    case 'star':
      return <Star {...props} />
    default:
      return null
  }
}

LinkIcon.propTypes = {
  title: PropTypes.string,
  type: PropTypes.string
}

export default LinkIcon
