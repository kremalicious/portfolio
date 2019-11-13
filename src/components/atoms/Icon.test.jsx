import React from 'react'
import { render } from '@testing-library/react'

import Icon from './Icon'

describe('Icon', () => {
  it('renders correctly', () => {
    const { container, rerender } = render(<Icon name={'website'} />)
    expect(container.firstChild.nodeName).toBe('svg')

    rerender(<Icon name={'github'} />)
    expect(container.firstChild.nodeName).toBe('svg')

    rerender(<Icon name={'dribbble'} />)
    expect(container.firstChild.nodeName).toBe('svg')

    rerender(<Icon name={'info'} />)
    expect(container.firstChild.nodeName).toBe('svg')

    rerender(<Icon name={'download'} />)
    expect(container.firstChild.nodeName).toBe('svg')

    rerender(<Icon name={'styleguide'} />)
    expect(container.firstChild.nodeName).toBe('svg')

    rerender(<Icon name={'Email'} />)
    expect(container.firstChild.nodeName).toBe('svg')

    rerender(<Icon name={'Blog'} />)
    expect(container.firstChild.nodeName).toBe('svg')

    rerender(<Icon name={'Twitter'} />)
    expect(container.firstChild.nodeName).toBe('svg')
  })

  it('does not render with unknown type', () => {
    const { container } = render(<Icon name={'whatever'} />)
    expect(container.firstChild).not.toBeInTheDocument()
  })
})
