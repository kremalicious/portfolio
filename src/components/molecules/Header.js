import React from 'react'
import './Header.css'
import { meta, social } from '../../constants'
import { Twitter, GitHub, Facebook } from '../atoms/Icons'

const SocialIcon = ({title}) => {
  if (title === 'Twitter') {
    return <Twitter />
  } else if (title === 'GitHub') {
    return <GitHub />
  } else if (title === 'Facebook') {
    return <Facebook />
  }
}

const Header = () => (
  <header className="header">
    <hgroup className="name">
      <h1 className="header__title">{meta.title}</h1>
      <p className="header__description">{meta.tagline}</p>
    </hgroup>
    <aside className="social">
      {social.map(link => (
        <a className="social__link" href={link.url} key={link.title} title={link.title}>
          <SocialIcon title={link.title} />
        </a>
      ))}
    </aside>
  </header>
)

export default Header
