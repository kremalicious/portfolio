import React from 'react'
import { render, screen } from '@testing-library/react'
import IndexPage from '../pages'
import ProjectPage from '../pages/[slug]'
import projects from './__fixtures__/projects.json'
import project from './__fixtures__/project.json'
import NotFoundPage from '../pages/404'

describe('pages', () => {
  it('IndexPage', async () => {
    render(<IndexPage allProjects={projects} />)
  })

  it('ProjectPage', () => {
    render(<ProjectPage project={project} projects={projects} />)
  })

  it('NotFoundPage', () => {
    render(<NotFoundPage />)
  })
})
