import React from 'react'
import Social from './Social'
import './Header.css'
import meta from '../../data/meta.json'

const Header = () => (
  <header className="header">
    <hgroup className="name">
      <span className="header__logo">␥</span>
      <h1 className="header__title">{meta.title}</h1>
      <p className="header__description">{meta.tagline}</p>
    </hgroup>

    <Social />
  </header>
)

export default Header
