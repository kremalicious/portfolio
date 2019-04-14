import React from 'react'
import { render } from 'react-testing-library'

import LinkIcon from './LinkIcon'

describe('LinkIcon', () => {
  const link = {
    title: 'my project',
    type: 'website'
  }

  it('renders correctly', () => {
    const { container } = render(
      <LinkIcon title={link.title} type={link.type} />
    )
    expect(container.firstChild.nodeName).toBe('svg')
  })

  it('does not render with unknown type', () => {
    const link = { type: 'whatever' }
    const { container } = render(<LinkIcon type={link.type} />)
    expect(container.firstChild).not.toBeInTheDocument()
  })
})
