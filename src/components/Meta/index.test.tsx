import { render } from '@testing-library/react'
import Meta from '.'

describe('Meta', () => {
  it('renders without crashing', async () => {
    render(<Meta title="Hello World" description="Hello" />, {
      container: document.head
    })

    expect(document.title).toBe('Hello World')
  })

  it('renders without crashing with slug', async () => {
    render(<Meta title="Hello World" description="Hello" slug="hello" />, {
      container: document.head
    })

    expect(document.title).toBe('Hello World')
  })
})
