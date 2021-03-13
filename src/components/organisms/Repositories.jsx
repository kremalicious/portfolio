import React from 'react'
import PropTypes from 'prop-types'

import Repository from '../molecules/Repository'
import {
  section,
  sectionTitle,
  repos as styleRepos
} from './Repositories.module.css'

Repositories.propTypes = {
  repos: PropTypes.array
}

export default function Repositories({ repos }) {
  if (!repos) return null

  return (
    <section className={section}>
      <h1 className={sectionTitle}>Open Source Projects</h1>
      <div className={styleRepos}>
        {repos.map((repo) => (
          <Repository key={repo.name} repo={repo} />
        ))}
      </div>
    </section>
  )
}
