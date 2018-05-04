import React from 'react'
import CSSTransition from 'react-transition-group/CSSTransition'
import './Animations.scss'

export const FadeIn = props => (
  <CSSTransition
    classNames="fadein"
    appear={true}
    in={true}
    timeout={{ enter: 200, exit: 200, appear: 200 }}
    {...props}
  />
)

export const MoveIn = props => (
  <CSSTransition
    classNames="movein"
    appear={true}
    in={true}
    timeout={{ enter: 300, exit: 200, appear: 300 }}
    {...props}
  />
)
