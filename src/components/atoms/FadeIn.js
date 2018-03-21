import React from 'react'
import { CSSTransition } from 'react-transition-group'
import './FadeIn.css'

const FadeIn = (props) => (
  <CSSTransition
    {...props}
    classNames="fadein"
    appear={true}
    in={true}
    timeout={400} />
)

export default FadeIn
