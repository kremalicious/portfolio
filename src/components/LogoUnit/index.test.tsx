import { render } from '@testing-library/react'
import LogoUnit from '.'
import meta from '../../../_content/meta.json'

describe('LogoUnit', () => {
  it('renders correctly from data file values', () => {
    const { container } = render(<LogoUnit />)

    expect(container.firstChild).toBeInTheDocument()
    expect(container.querySelector('.title')).toHaveTextContent(
      meta.author.name.toLowerCase()
    )
    expect(container.querySelector('.description')).toHaveTextContent(
      meta.author.label.toLowerCase()
    )
  })

  it('renders in small variant', () => {
    const { container } = render(<LogoUnit small />)

    expect(container.firstChild).toBeInTheDocument()
    expect(container.querySelector('.small')).toBeInTheDocument()
  })
})
