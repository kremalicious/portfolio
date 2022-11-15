import React from 'react'
import { render, act } from '@testing-library/react'
import Meta from '.'

describe('Meta', () => {
  it('renders without crashing', async () => {
    await act(async () => {
      render(<Meta title="Hello World" />, {
        container: document.head
      })
    })
    expect(document.title).toBe('Hello World')
  })

  it('renders without crashing with slug', async () => {
    await act(async () => {
      render(<Meta title="Hello World" slug="hello" />, {
        container: document.head
      })
    })
    expect(document.title).toBe('Hello World')
  })
})
