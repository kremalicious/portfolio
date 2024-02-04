import { render, screen } from '@testing-library/react'
import Layout from '../layout'

describe('app: /layout', () => {
  // suppress error "Warning: validateDOMNesting(...): <html> cannot appear as a child of <div>"
  // https://github.com/testing-library/react-testing-library/issues/1250
  let originalError: {
    (...data: any[]): void
    (message?: any, ...optionalParams: any[]): void
    (...data: any[]): void
    (message?: any, ...optionalParams: any[]): void
  }

  beforeAll(() => {
    originalError = console.error
    console.error = jest.fn()
  })

  afterAll(() => {
    console.error = originalError
  })

  it('renders correctly', async () => {
    render(<Layout>Hello</Layout>)

    await screen.findByText('Hello')
  })
})
