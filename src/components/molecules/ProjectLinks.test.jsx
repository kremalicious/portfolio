import React from 'react'
import { render } from '@testing-library/react'
import ProjectLinks from './ProjectLinks'

describe('ProjectLinks', () => {
  const links = [
    {
      title: 'my project',
      icon: 'website',
      url: 'https://hello.com'
    },
    {
      title: 'GitHub',
      url: 'https://github.com'
    }
  ]

  it('renders correctly', () => {
    const { container, getAllByTestId } = render(<ProjectLinks links={links} />)

    expect(container.firstChild).toBeInTheDocument()
    expect(getAllByTestId('link')[0].nodeName).toBe('A')
    expect(getAllByTestId('link')[0].textContent).toBe('my project')
    expect(getAllByTestId('link')[0].attributes.href.textContent).toBe(
      'https://hello.com'
    )
  })
})
