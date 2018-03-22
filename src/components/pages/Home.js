import React, { Component } from 'react'
import projects from '../../data/projects.json'

class Home extends Component {
  render() {
    return (
      <main className="screen screen--home">

        <aside className="social">
          <a href="https://kremalicious.com">Blog</a>
          <a href="https://github.com/kremalicious">GitHub</a>
          <a href="https://dribbble.com/kremalicious">Dribbble</a>
          <a href="https://twitter.com/kremalicious">Twitter</a>
        </aside>

        <ul>
          {projects.map(project => (
            <li key={project.slug}>{project.name}</li>
          ))}
        </ul>
      </main>
    )
  }
}

export default Home
