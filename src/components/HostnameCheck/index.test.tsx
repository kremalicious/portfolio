import { render, screen } from '@testing-library/react'
import HostnameCheck, { generateMetadata } from '.'

interface MockedWindow extends Omit<Window, 'location'> {
  location: {
    hostname: string
  }
}

describe('HostnameCheck', () => {
  const originalLocation = window.location

  beforeAll(() => {
    // Delete the existing location and create a simple mock
    // biome-ignore lint/performance/noDelete: Required for Jest window.location mocking
    // biome-ignore lint/suspicious/noExplicitAny: Required for Jest window.location mocking
    delete (window as any).location
    // Create a proper mock location object
    ;(window as MockedWindow).location = { hostname: 'localhost' }
  })

  afterAll(() => {
    // Restore the original location
    ;(window as MockedWindow).location = originalLocation
  })

  it('can access window.location', () => {
    expect(window).not.toBe(undefined)
    expect(window.location).not.toBe(undefined)
  })

  it('renders correctly', async () => {
    ;(window as MockedWindow).location.hostname = 'hello.com'
    const allowedHosts = ['hello.com']
    render(<HostnameCheck allowedHosts={allowedHosts} />)
    const element = await screen.findByText(/do a remix/i)
    expect(element).toBeDefined()
  })

  it('does not render if on correct hostname', async () => {
    ;(window as MockedWindow).location.hostname = 'localhost'
    const allowedHosts = ['localhost']
    const { container } = render(<HostnameCheck allowedHosts={allowedHosts} />)
    expect(container.firstChild).toBeNull()
  })

  it('generateMetadata: should return robots metadata when host is not allowed', async () => {
    // Set hostname to a disallowed host
    ;(window as MockedWindow).location.hostname = 'disallowed.com'

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
