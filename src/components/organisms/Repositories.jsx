import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import Repository from '../molecules/Repository'
import styles from './Repositories.module.scss'

export default class Repositories extends PureComponent {
  static propTypes = {
    repos: PropTypes.array
  }

  render() {
    if (!this.props.repos) return null

    return (
      <section className={styles.section}>
        <h1 className={styles.sectionTitle}>Open Source Projects</h1>
        <div className={styles.repos}>
          {this.props.repos.map(repo => (
            <Repository key={repo.name} repo={repo} />
          ))}
        </div>
      </section>
    )
  }
}
