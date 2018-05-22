import React from 'react'
import CSSTransition from 'react-transition-group/CSSTransition'
import './Animations.scss'

const Animation = props => <CSSTransition appear={true} in={true} {...props} />

export const FadeIn = props => (
  <Animation
    classNames="fadein"
    timeout={{ enter: 200, exit: 200, appear: 200 }}
    {...props}
  />
)

export const MoveIn = props => (
  <Animation
    classNames="movein"
    timeout={{ enter: 300, exit: 200, appear: 300 }}
    {...props}
  />
)
