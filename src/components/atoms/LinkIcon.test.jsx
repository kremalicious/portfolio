import React from 'react'
import { render } from 'react-testing-library'

import LinkIcon from './LinkIcon'

describe('LinkIcon', () => {
  it('renders correctly', () => {
    const { container, rerender } = render(
      <LinkIcon title={'my project'} type={'website'} />
    )
    expect(container.firstChild.nodeName).toBe('svg')

    rerender(<LinkIcon type={'github'} />)
    expect(container.firstChild.nodeName).toBe('svg')

    rerender(<LinkIcon type={'dribbble'} />)
    expect(container.firstChild.nodeName).toBe('svg')

    rerender(<LinkIcon type={'info'} />)
    expect(container.firstChild.nodeName).toBe('svg')

    rerender(<LinkIcon type={'download'} />)
    expect(container.firstChild.nodeName).toBe('svg')

    rerender(<LinkIcon type={'styleguide'} />)
    expect(container.firstChild.nodeName).toBe('svg')
  })

  it('does not render with unknown type', () => {
    const { container } = render(<LinkIcon type={'whatever'} />)
    expect(container.firstChild).not.toBeInTheDocument()
  })
})
