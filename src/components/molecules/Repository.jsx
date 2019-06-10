import React from 'react'
import PropTypes from 'prop-types'
import LinkIcon from '../atoms/LinkIcon'
import styles from './Repository.module.scss'

const Repository = ({ repo }) => {
  const { name, description, html_url, homepage, stargazers_count } = repo

  // for blog & portfolio and if there's no homepage, use github url
  // else use homepage field
  const repoLink =
    name === 'blog' || name === 'portfolio' || !homepage ? html_url : homepage

  return (
    <div className={styles.repo}>
      <h1 className={styles.repoTitle}>
        <a href={repoLink}>{name}</a>
      </h1>
      <p>{description}</p>
      <p className={styles.meta}>
        {name === 'portfolio' || name === 'blog'
          ? null
          : homepage && (
              <a href={homepage}>
                <LinkIcon title="website" /> Release post
              </a>
            )}

        <a href={html_url}>
          <LinkIcon title="github" /> GitHub
        </a>

        <a href={`${html_url}/stargazers`}>
          <LinkIcon title="star" /> {stargazers_count}
        </a>
      </p>
    </div>
  )
}

Repository.propTypes = {
  repo: PropTypes.object.isRequired
}

export default Repository
