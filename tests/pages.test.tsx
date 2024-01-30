import { fireEvent, render, screen } from '@testing-library/react'
import IndexPage, { getStaticProps } from '../src/pages'
import NotFoundPage from '../src/pages/404'
import ProjectPage, {
  getStaticPaths,
  getStaticProps as getStaticPropsProject
} from '../src/app/[slug]/page'
import mockData from './__fixtures__/giphy.json'
import project from './__fixtures__/project.json'
import projects from './__fixtures__/projects.json'
import repos from './__fixtures__/repos.json'

jest.setTimeout(30000)

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
    render(<NotFoundPage />)
    await screen.findByText(/Shenanigans, page not found./)
    await screen.findByTestId(mockData.data.images.original.mp4)

    const button = await screen.findByText(`Get another 'cat' gif`)
    fireEvent.click(button)
    await screen.findByTestId(mockData.data.images.original.mp4)
  })
})
