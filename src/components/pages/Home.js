import React, { Component } from 'react'
import LazyLoad from 'react-lazyload'
import FadeIn from '../atoms/FadeIn'
import projects from '../../data/projects.json'
import './Home.css'

class Home extends Component {
  render() {
    return (
      <main className="screen screen--home">

        <div className="projects">
            {projects.map(project => (
              <LazyLoad key={project.slug} height={700} once>
                <FadeIn>
                  <article className="project" key={project.slug}>
                    <h1 className="project__title">{project.name}</h1>
                  </article>
                </FadeIn>
              </LazyLoad>
            ))}
        </div>

      </main>
    )
  }
}

export default Home
