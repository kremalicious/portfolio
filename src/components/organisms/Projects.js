import React from 'react'
import Link from 'react-router-dom/Link'
import LazyLoad from 'react-lazyload'
import FadeIn from '../atoms/FadeIn'
import projects from '../../data/projects.json'
import images from '../../images'
import '../atoms/FullWidth'
import './Projects.css'

const Projects = () => (
  <div className="projects full-width">
    {projects.map(project => (
      <LazyLoad key={project.slug} height={700} offset={200} once>
        <FadeIn>
          <Link
            key={project.slug}
            to={{ pathname: `/${project.slug}` }}
            className="projects__project"
          >
            <h1 className="projects__project__title">{project.title}</h1>

            <img className="projects__project__image" src={images[project.img]} alt={project.title} />
          </Link>
        </FadeIn>
      </LazyLoad>
    ))}
  </div>
)

export default Projects
