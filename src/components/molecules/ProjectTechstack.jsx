import React from 'react'
import PropTypes from 'prop-types'
import { projectTechstack, title } from './ProjectTechstack.module.css'

const ProjectTechstack = ({ techstack }) => (
  <div className={projectTechstack}>
    <h3 className={title}>
      Tools & Technologies <span>The tech stack I was involved with.</span>
    </h3>
    <ul>
      {techstack.map((tech) => (
        <li key={tech}>{tech}</li>
      ))}
    </ul>
  </div>
)

ProjectTechstack.propTypes = {
  techstack: PropTypes.array
}

export default ProjectTechstack
