import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { FadeIn } from '../atoms/Animations'
import { ReactComponent as Day } from '../../images/day.svg'
import { ReactComponent as Night } from '../../images/night.svg'
import './ThemeSwitch.scss'

const ThemeToggle = props => {
  return (
    <span
      id="toggle"
      className="checkbox__faux-container"
      aria-live="assertive"
    >
      <Day className={props.dark ? 'icon' : 'icon active'} />
      <span className="checkbox__faux" />
      <Night className={props.dark ? 'icon active' : 'icon'} />
    </span>
  )
}

class ThemeSwitch extends PureComponent {
  constructor(props) {
    super(props)

    this.state = { dark: false }
  }

  componentDidMount() {
    const now = new Date().getHours()

    if (now >= 19 || now <= 7) {
      this.setState({ dark: true })
    }
  }

  isDark = () => this.state.dark === true

  handleChange = () => {
    this.setState({ dark: !this.isDark() })
  }

  render() {
    return (
      <Fragment>
        <Helmet>
          <body className={this.state.dark ? 'dark' : null} />
        </Helmet>
        <FadeIn>
          <aside className="themeswitch">
            <label className="checkbox">
              <span className="checkbox__label">Toggle Night Mode</span>
              <input
                onChange={this.handleChange}
                type="checkbox"
                name="toggle"
                value="toggle"
                aria-describedby="toggle"
                checked={this.state.dark}
              />
              <ThemeToggle dark={this.state.dark} />
            </label>
          </aside>
        </FadeIn>
      </Fragment>
    )
  }
}

ThemeToggle.propTypes = {
  dark: PropTypes.bool
}

export default ThemeSwitch
