import React from 'react'
import { render } from 'react-testing-library'
import ProjectLinks from './ProjectLinks'

describe('ProjectLinks', () => {
  const links = [
    {
      title: 'my project',
      type: 'website',
      url: 'https://hello.com'
    }
  ]

  it('renders correctly', () => {
    const { container, getByTestId } = render(<ProjectLinks links={links} />)

    expect(container.firstChild).toBeInTheDocument()
    expect(getByTestId('link').nodeName).toBe('A')
    expect(getByTestId('link').textContent).toBe('my project')
    expect(getByTestId('link').attributes.href.textContent).toBe(
      'https://hello.com'
    )
  })
})
