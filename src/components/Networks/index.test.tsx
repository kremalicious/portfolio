import { render } from '@testing-library/react'
import Networks from '.'

describe('Networks', () => {
  it('renders correctly from data file values', () => {
    const { container } = render(<Networks label="Networks" />)
    expect(container.firstChild).toBeInTheDocument()
    expect(container.firstChild.nodeName).toBe('SECTION')
  })

  it('renders correctly in small variant', () => {
    const { container } = render(<Networks label="Networks" small={true} />)
    expect(container.firstChild).toBeInTheDocument()
    expect(container.querySelector('.small')).toBeInTheDocument()
  })
})
