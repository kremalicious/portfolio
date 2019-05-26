import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import Repository from '../molecules/Repository'
import styles from './Repositories.module.scss'

export default class Repositories extends PureComponent {
  static propTypes = {
    user: PropTypes.string.isRequired,
    repos: PropTypes.array.isRequired
  }

  state = { repos: [] }

  async componentDidMount() {
    try {
      const repos = await this.getGithubRepos(this.props.user)
      this.setState({ repos })
    } catch (error) {
      console.error(error.message) // eslint-disable-line
    }
  }

  async getGithubRepos(user) {
    const allRepos = await axios.get(
      `https://api.github.com/users/${user}/repos?per_page=100`
    )
    const repos = allRepos.data
      .filter(({ name }) => this.props.repos.includes(name))
      .sort((a, b) => b.pushed_at.localeCompare(a.pushed_at)) // sort by pushed to, newest first

    return repos
  }

  render() {
    return (
      <section className={styles.section}>
        <h1 className={styles.sectionTitle}>Open Source Projects</h1>
        <div className={styles.repos}>
          {this.state.repos.map(repo => (
            <Repository key={repo.name} repo={repo} />
          ))}
        </div>
      </section>
    )
  }
}
