import React, { Component } from 'react'
import Link from 'react-router-dom/Link'
import LazyLoad from 'react-lazyload'
import Header from '../molecules/Header'
import FadeIn from '../atoms/FadeIn'
import projects from '../../data/projects.json'
import './Home.css'

class Home extends Component {
  render() {
    return (
      <main className="screen screen--home">

        <Header />

        <div className="projects">
            {projects.map(project => (
              <LazyLoad key={project.slug} height={700} offset={200} once>
                <FadeIn>
                  <Link
                    key={project.slug}
                    to={{pathname: `/${project.slug}`}}
                  >
                    <article className="project">
                      <h1 className="project__title">{project.title}</h1>
                    </article>
                  </Link>
                </FadeIn>
              </LazyLoad>
            ))}
        </div>

      </main>
    )
  }
}

export default Home
