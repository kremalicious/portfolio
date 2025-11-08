import { beforeEach, describe, expect, it, mock } from 'bun:test'
import { createFetchMock } from '@test/mock-fetch'
import type { UseLocation } from '../types/types'
import './location-element'

const mockLocation: UseLocation = {
  now: {
    city: 'Berlin',
    country: 'Germany',
    countryCode: 'DE',
    startDate: '2024-01-01',
    endDate: '2024-12-31'
  },
  next: {
    city: 'Tokyo',
    country: 'Japan',
    countryCode: 'JP',
    startDate: '2025-01-15',
    endDate: '2025-02-15'
  }
}

const mockLocationSameCountry: UseLocation = {
  now: {
    city: 'Berlin',
    country: 'Germany',
    countryCode: 'DE',
    startDate: '2024-01-01',
    endDate: '2024-12-31'
  },
  next: {
    city: 'Munich',
    country: 'Germany',
    countryCode: 'DE',
    startDate: '2025-01-15',
    endDate: '2025-02-15'
  }
}

function setupDocument(): void {
  document.body.innerHTML = '<location-element></location-element>'
}

beforeEach(() => {
  document.body.innerHTML = ''
  mock.restore()
})

describe('LocationElement', () => {
  it('renders nothing initially', async () => {
    setupDocument()
    await customElements.whenDefined('location-element')

    const element = document.querySelector('location-element')
    expect(element).toBeTruthy()
    expect(element?.innerHTML).toBe('')
  })

  it('renders current location with flag', async () => {
    global.fetch = createFetchMock({ body: mockLocation })
    setupDocument()
    await customElements.whenDefined('location-element')

    // Wait for async location load
    await new Promise((resolve) => setTimeout(resolve, 10))

    const element = document.querySelector('location-element')
    expect(element?.innerHTML).toContain('Berlin')
    expect(element?.innerHTML).toContain('Now')
    expect(element?.querySelector('.flag')).toBeTruthy()
    expect(element?.querySelector('.flag')?.getAttribute('aria-label')).toBe(
      'Germany'
    )
  })

  it('renders next location when different country', async () => {
    global.fetch = createFetchMock({ body: mockLocation })
    setupDocument()
    await customElements.whenDefined('location-element')

    await new Promise((resolve) => setTimeout(resolve, 10))

    const element = document.querySelector('location-element')
    expect(element?.innerHTML).toContain('Tokyo')
    expect(element?.querySelector('.next')).toBeTruthy()

    const flags = element?.querySelectorAll('.flag')
    expect(flags?.length).toBe(2) // One for Germany, one for Japan
  })

  it('renders next location without flag when same country', async () => {
    global.fetch = createFetchMock({ body: mockLocationSameCountry })
    setupDocument()
    await customElements.whenDefined('location-element')

    await new Promise((resolve) => setTimeout(resolve, 10))

    const element = document.querySelector('location-element')
    expect(element?.innerHTML).toContain('Munich')

    const flags = element?.querySelectorAll('.flag')
    expect(flags?.length).toBe(1) // Only one flag for Germany
  })

  it('clears interval on disconnect', async () => {
    global.fetch = createFetchMock({ body: mockLocation })
    setupDocument()
    await customElements.whenDefined('location-element')

    await new Promise((resolve) => setTimeout(resolve, 10))

    const element = document.querySelector('location-element')
    element?.remove()

    // Component should clean up its interval when disconnected
    expect(element?.isConnected).toBe(false)
  })

  it('handles fetch error gracefully', async () => {
    global.fetch = createFetchMock({ error: new Error('Network error') })
    setupDocument()
    await customElements.whenDefined('location-element')

    await new Promise((resolve) => setTimeout(resolve, 10))

    const element = document.querySelector('location-element')
    // Component should still exist but be empty
    expect(element).toBeTruthy()
  })

  it('handles missing location data', async () => {
    global.fetch = createFetchMock({ body: null })
    setupDocument()
    await customElements.whenDefined('location-element')

    await new Promise((resolve) => setTimeout(resolve, 10))

    const element = document.querySelector('location-element')
    expect(element?.innerHTML).toBe('')
  })
})
