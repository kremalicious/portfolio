import React from 'react'
import { Twitter, GitHub, Facebook } from '../atoms/Icons'
import { social } from '../../constants'
import './Social.css'

const SocialIcon = ({ title }) => {
  if (title === 'Twitter') {
    return <Twitter />
  } else if (title === 'GitHub') {
    return <GitHub />
  } else if (title === 'Facebook') {
    return <Facebook />
  }
}

const Social = () => (
  <aside className="social">
    {social.map(link => (
      <a className="social__link" href={link.url} key={link.title} title={link.title}>
        <SocialIcon title={link.title} />
      </a>
    ))}
  </aside>
)

export default Social
