import React from 'react'
import Link from 'react-router-dom/Link'
import FadeIn from '../atoms/FadeIn'
import projects from '../../data/projects.json'
import images from '../../images'
import './Projects.scss'

const Projects = () => (
  <div className="projects full-width">
    {projects.map(project => (
      <FadeIn key={project.slug}>
        <Link
          key={project.slug}
          to={{ pathname: `/${project.slug}` }}
          className="projects__project"
        >
          <h1 className="projects__project__title">{project.title}</h1>

          <img
            className="projects__project__image"
            src={images[project.img]}
            alt={project.title}
          />
        </Link>
      </FadeIn>
    ))}
  </div>
)

export default Projects
