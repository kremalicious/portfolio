import fetch, { FetchMock } from 'jest-fetch-mock'
import { imageToDataUrl } from './imageToDataUrl'

const dummyPath = 'http://example.com/image.png'
const pixel = [
  0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, 0x00, 0x00, 0x00, 0x0d, 0x49,
  0x48, 0x44, 0x52, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x01, 0x08, 0x06,
  0x00, 0x00, 0x00, 0x1f, 0x15, 0xc4, 0x89, 0x00, 0x00, 0x00, 0x0a, 0x49, 0x44,
  0x41, 0x54, 0x78, 0x9c, 0x63, 0x00, 0x01, 0x00, 0x00, 0x05, 0x00, 0x01, 0x0d,
  0x0a, 0x2d, 0xb4, 0x00, 0x00, 0x00, 0x00, 0x49, 0x45, 0x4e, 0x44, 0xae, 0x42,
  0x60, 0x82
]

describe('imageToDataUrl', () => {
  beforeEach(() => {
    fetch.resetMocks()
    const mockBlob = new Blob([new Uint8Array(pixel)], { type: 'image/png' })
    const mockResponse = new Response(mockBlob)
    ;(fetch as FetchMock).mockResponseOnce(async () => {
      const text = await mockResponse.text()
      return text
    })
  })

  it('should convert image to data URL', async () => {
    function MockFileReader() {
      this.readAsDataURL = function () {
        this.result = 'data:image/png;base64,...'
        setTimeout(() => this.onload(), 0)
      }
    }

    window.FileReader = MockFileReader as any

    const dataUrl = await imageToDataUrl(dummyPath)
    expect(dataUrl).toBe('data:image/png;base64,...')
  })

  it('should handle errors in readAsDataURL', async () => {
    function MockFileReader() {
      this.readAsDataURL = function () {
        throw new Error('Mock error')
      }
    }

    window.FileReader = MockFileReader as any

    // Expect imageToDataUrl to reject with the mock error
    await expect(imageToDataUrl(dummyPath)).rejects.toThrow('Mock error')
  })
})
