import React, { PureComponent } from 'react'
import Link from 'gatsby-link'
import PropTypes from 'prop-types'
import { FadeIn } from '../atoms/Animations'
import Networks from '../molecules/Networks'
import Availability from '../molecules/Availability'
import ThemeSwitch from '../molecules/ThemeSwitch'
import LogoUnit from '../atoms/LogoUnit'
import './Header.scss'

class Header extends PureComponent {
  constructor(props) {
    super(props)

    this.state = { classes: 'header' }
  }

  componentDidMount() {
    this.toggleClasses()
  }

  componentDidUpdate() {
    this.toggleClasses()
  }

  toggleClasses = () => {
    if (this.props.isHomepage) {
      this.setState({ classes: 'header' })
    } else {
      this.setState({ classes: 'header header--minimal' })
    }
  }

  render() {
    const meta = this.props.meta
    const isHomepage = this.props.isHomepage

    return (
      <header className={this.state.classes}>
        <ThemeSwitch />
        <FadeIn>
          <Link className="header__logounit-link" to={'/'}>
            <LogoUnit meta={meta} minimal={!isHomepage} />
          </Link>
        </FadeIn>

        <Networks meta={meta} hide={!isHomepage} />

        <Availability
          meta={meta}
          hide={!isHomepage && !meta.availability.status}
        />
      </header>
    )
  }
}

Header.propTypes = {
  meta: PropTypes.object,
  isHomepage: PropTypes.bool
}

export default Header
