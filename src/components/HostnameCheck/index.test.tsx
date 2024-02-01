import { render, screen } from '@testing-library/react'
import HostnameCheck, { generateMetadata } from '.'

describe('HostnameCheck', () => {
  it('can access window.location', () => {
    expect(window).not.toBe(undefined)
    expect(window.location).not.toBe(undefined)
  })

  it('renders correctly', async () => {
    const allowedHosts = ['hello.com']
    render(<HostnameCheck allowedHosts={allowedHosts} />)
    const element = await screen.findByText(/do a remix/i)
    expect(element).toBeDefined()
  })

  it('does not render if on correct hostname', async () => {
    const allowedHosts = ['localhost']
    const { container } = render(<HostnameCheck allowedHosts={allowedHosts} />)
    expect(container.firstChild).toBeNull()
  })

  it('generateMetadata: should return robots metadata when host is not allowed', async () => {
    // Mock window object
    global.window = Object.create(window)
    Object.defineProperty(window, 'location', {
      value: {
        hostname: 'disallowed.com'
      }
    })

    const params = { allowedHosts: ['allowed.com'] }
    const result = await generateMetadata({ params })

    expect(result).toEqual({
      robots: {
        index: false,
        follow: false
      }
    })
  })
})
