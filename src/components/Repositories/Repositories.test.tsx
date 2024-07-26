import type { Repo } from '@/types/repo'
import { render } from '@testing-library/react'
import repos from '@tests/__fixtures__/repos.json'
import Repositories from '.'

describe('Repositories', () => {
  it('renders correctly', () => {
    const { container } = render(<Repositories repos={repos as Repo[]} />)
    expect(container.firstChild).toBeInTheDocument()
  })
})
