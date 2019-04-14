import React from 'react'
import { render } from 'react-testing-library'

import Button from './Button'

describe('Button', () => {
  it('renders correctly', () => {
    const { getByText } = render(<Button href="/somewhere">Hello</Button>)

    expect(getByText('Hello').nodeName).toBe('A')
  })

  it('renders children', () => {
    const children = <span>Hello World</span>
    const { getByText } = render(<Button href="/children">{children}</Button>)

    expect(getByText('Hello World')).toBeDefined()
  })
})
