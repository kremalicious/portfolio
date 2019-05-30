import React from 'react'
import { render } from '@testing-library/react'

import Button from './Button'

describe('Button', () => {
  it('renders correctly', () => {
    const { container } = render(<Button href="/somewhere">Hello</Button>)

    expect(container.firstChild.nodeName).toBe('A')
    expect(container.firstChild).toBeInTheDocument()
  })

  it('renders children', () => {
    const children = <span>Hello World</span>
    const { container } = render(<Button href="/children">{children}</Button>)

    expect(container.firstChild.nodeName).toBe('A')
    expect(container.firstChild).toBeInTheDocument()
  })
})
