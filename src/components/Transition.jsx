import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import posed, { PoseGroup } from 'react-pose'

const timeout = 200

export default class Transition extends PureComponent {
  static propTypes = {
    children: PropTypes.node.isRequired,
    location: PropTypes.object.isRequired
  }

  render() {
    const { children, location } = this.props

    const RoutesContainer = posed.div({
      enter: { opacity: 1, delay: timeout, delayChildren: timeout },
      exit: { opacity: 0, delay: 0 }
    })

    return (
      <PoseGroup animateOnMount={true}>
        <RoutesContainer key={location.pathname}>{children}</RoutesContainer>
      </PoseGroup>
    )
  }
}
