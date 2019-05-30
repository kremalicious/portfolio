import React from 'react'
import { render } from '@testing-library/react'
import HostnameCheck from './HostnameCheck'

describe('HostnameCheck', () => {
  it('can access window.location', () => {
    expect(window).not.toBe(undefined)
    expect(window.location).not.toBe(undefined)
  })

  it('renders correctly', () => {
    const allowedHosts = ['hello.com']
    const { container } = render(<HostnameCheck allowedHosts={allowedHosts} />)
    expect(container.firstChild).toHaveTextContent('do a remix')
    expect(container.firstChild).toBeInTheDocument()
  })

  it('does not render if on correct hostname', () => {
    const allowedHosts = ['localhost']
    const { container } = render(<HostnameCheck allowedHosts={allowedHosts} />)
    expect(container.firstChild).not.toBeInTheDocument()
  })
})
