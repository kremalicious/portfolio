import { act, render } from '@testing-library/react'
import IndexPage, { getStaticProps } from '../src/pages'
import ProjectPage, {
  getStaticPaths,
  getStaticProps as getStaticPropsProject
} from '../src/pages/[slug]'
import projects from './__fixtures__/projects.json'
import project from './__fixtures__/project.json'
import repos from './__fixtures__/repos.json'
import NotFoundPage from '../src/pages/404'

jest.setTimeout(10000)

describe('pages', () => {
  it('IndexPage', async () => {
    render(<IndexPage projects={projects} repos={repos} />)
  })

  it('IndexPage/getStaticProps', async () => {
    ;(global.fetch as jest.Mock) = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(repos)
      })
    )
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

  it('NotFoundPage', async () => {
    await act(async () => {
      render(<NotFoundPage />)
    })
  })
})
