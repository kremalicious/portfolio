import React from 'react'
import { render } from '@testing-library/react'

import Icon from '.'

describe('Icon', () => {
  it('renders correctly', () => {
    const { container, rerender } = render(<Icon name={'Compass'} />)
    expect(container.firstChild.nodeName).toBe('svg')

    rerender(<Icon name={'Dribbble'} />)
    expect(container.firstChild.nodeName).toBe('svg')

    rerender(<Icon name={'Download'} />)
    expect(container.firstChild.nodeName).toBe('svg')

    rerender(<Icon name={'Styleguide'} />)
    expect(container.firstChild.nodeName).toBe('svg')

    rerender(<Icon name={'Blog'} />)
    expect(container.firstChild.nodeName).toBe('svg')

    rerender(<Icon name={'Twitter'} />)
    expect(container.firstChild.nodeName).toBe('svg')
  })

  it('does not render with unknown name', () => {
    const { container } = render(<Icon name={'whatever'} />)
    expect(container.firstChild).not.toBeInTheDocument()
  })
})
