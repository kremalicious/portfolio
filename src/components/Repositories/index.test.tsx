import { render } from '@testing-library/react'
import Repositories from '.'
import repos from '../../../tests/__fixtures__/repos.json'
import Repo from '../../types/repo'

describe('Repositories', () => {
  it('renders correctly', () => {
    const { container } = render(<Repositories repos={repos as Repo[]} />)
    expect(container.firstChild).toBeInTheDocument()
  })
})
