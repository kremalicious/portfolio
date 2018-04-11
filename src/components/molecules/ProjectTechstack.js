import React from 'react'
import PropTypes from 'prop-types'
import './ProjectTechstack.scss'

const ProjectTechstack = ({ techstack }) => (
  <div className="project__techstack">
    <h3 className="project__meta__title">
      Tools & Technologies <span>The tech stack I was involved with.</span>
    </h3>
    <ul>
      {techstack.map(tech => <li key={tech}>{tech}</li>)}
    </ul>
  </div>
)

ProjectTechstack.propTypes = {
  techstack: PropTypes.array,
}

export default ProjectTechstack
