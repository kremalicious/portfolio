import { describe, expect, it, mock } from 'bun:test'
import { imageToDataUrl } from './imageToDataUrl'

const dummyPath = 'http://example.com/image.png'
const pixel = new Uint8Array([
  0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, 0x00, 0x00, 0x00, 0x0d, 0x49,
  0x48, 0x44, 0x52, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x01, 0x08, 0x06,
  0x00, 0x00, 0x00, 0x1f, 0x15, 0xc4, 0x89, 0x00, 0x00, 0x00, 0x0a, 0x49, 0x44,
  0x41, 0x54, 0x78, 0x9c, 0x63, 0x00, 0x01, 0x00, 0x00, 0x05, 0x00, 0x01, 0x0d,
  0x0a, 0x2d, 0xb4, 0x00, 0x00, 0x00, 0x00, 0x49, 0x45, 0x4e, 0x44, 0xae, 0x42,
  0x60, 0x82
])

type FetchMock = ReturnType<typeof mock<typeof fetch>>

function createFetchMock(response: Response): FetchMock & typeof fetch {
  const fetchMock = mock<typeof fetch>().mockResolvedValue(response)
  return Object.assign(fetchMock, {
    preconnect: async () => {}
  })
}

describe('imageToDataUrl', () => {
  it('should convert image to data URL', async () => {
    const blob = new Blob([pixel], { type: 'image/png' })
    const fetchMock = createFetchMock(new Response(blob))

    class SuccessfulFileReader implements Partial<FileReader> {
      onload: ((event: ProgressEvent<FileReader>) => void) | null = null
      result: string | null = null

      readAsDataURL(): void {
        this.result = 'data:image/png;base64,...'
        const event = new Event('load') as unknown as ProgressEvent<FileReader>
        this.onload?.(event)
      }
    }

    const dataUrl = await imageToDataUrl(dummyPath, {
      fetchImplementation: fetchMock,
      fileReaderConstructor:
        SuccessfulFileReader as unknown as typeof FileReader
    })

    expect(fetchMock).toHaveBeenCalledWith(dummyPath)
    expect(dataUrl).toBe('data:image/png;base64,...')
  })

  it('should handle errors in readAsDataURL', async () => {
    const blob = new Blob([pixel], { type: 'image/png' })
    const fetchMock = createFetchMock(new Response(blob))

    class FailingFileReader implements Partial<FileReader> {
      readAsDataURL(): never {
        throw new Error('Mock error')
      }
    }

    expect(
      imageToDataUrl(dummyPath, {
        fetchImplementation: fetchMock,
        fileReaderConstructor: FailingFileReader as unknown as typeof FileReader
      })
    ).rejects.toThrow('Mock error')
  })
})
