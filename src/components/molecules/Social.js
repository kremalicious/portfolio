import React from 'react'
import { Twitter, GitHub, Facebook } from '../atoms/Icons'
import meta from '../../data/meta.json'
import './Social.scss'

const social = meta.social

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
    {Object.keys(social).map((key, i) => (
      <a className="social__link" href={social[key]} key={i} title={key}>
        <SocialIcon title={key} />
      </a>
    ))}
  </aside>
)

export default Social
