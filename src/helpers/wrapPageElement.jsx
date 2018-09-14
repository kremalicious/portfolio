import React from 'react'
import Transition from '../components/Transition'

const wrapPageElement = ({ element, props }) => (
  <Transition {...props}>{element}</Transition>
)

export default wrapPageElement
