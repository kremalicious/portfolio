import React, { memo } from 'react'
import PropTypes from 'prop-types'

import Repository from '../molecules/Repository'
import styles from './Repositories.module.css'

Repositories.propTypes = {
  repos: PropTypes.array
}

function Repositories({ repos }) {
  if (!repos) return null

  return (
    <section className={styles.section}>
      <h1 className={styles.sectionTitle}>Open Source Projects</h1>
      <div className={styles.repos}>
        {repos.map((repo) => (
          <Repository key={repo.name} repo={repo} />
        ))}
      </div>
    </section>
  )
}

export default memo(Repositories)
