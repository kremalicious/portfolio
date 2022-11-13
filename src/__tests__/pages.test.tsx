import React from 'react'
import { render, screen } from '@testing-library/react'
import IndexPage, { getStaticProps } from '../pages'
import ProjectPage, {
  getStaticPaths,
  getStaticProps as getStaticPropsProject
} from '../pages/[slug]'
import projects from './__fixtures__/projects.json'
import project from './__fixtures__/project.json'
import NotFoundPage from '../pages/404'
// import MyApp from '../pages/_app'

describe('pages', () => {
  // it('_app', async () => {
  //   render(
  //     <MyApp
  //       Component={<div>Hello World</div>}
  //       pageProps={{} as any}
  //       router={{} as any}
  //     />
  //   )
  // })

  it('IndexPage', async () => {
    render(<IndexPage allProjects={projects} />)
  })

  it('IndexPage/getStaticProps', async () => {
    const props = await getStaticProps({} as any)
    expect(props).toBeDefined()
  })

  it('ProjectPage', () => {
    render(<ProjectPage project={project} projects={projects} />)
  })

  it('ProjectPage/getStaticPaths', async () => {
    const props = await getStaticPaths({} as any)
    expect(props).toBeDefined()
  })

  it('ProjectPage/getStaticProps', async () => {
    const props = await getStaticPropsProject({ params: { slug: 'ipixelpad' } })
    expect(props).toBeDefined()
  })

  it('NotFoundPage', () => {
    render(<NotFoundPage />)
  })
})
