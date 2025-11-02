interface ImageToDataUrlOptions {
  fetchImplementation?: typeof fetch
  fileReaderConstructor?: typeof FileReader
}

export async function imageToDataUrl(
  path: string,
  options: ImageToDataUrlOptions = {}
): Promise<string> {
  const fetchImplementation =
    options.fetchImplementation ?? (globalThis.fetch as typeof fetch | undefined)
  const fileReaderConstructor =
    options.fileReaderConstructor ??
    (globalThis as { FileReader?: typeof FileReader }).FileReader

  if (!fetchImplementation) {
    throw new Error('Fetch is not available')
  }
  if (!fileReaderConstructor) {
    throw new Error('FileReader is not available')
  }

  const response = await fetchImplementation(path)
  const blob = await response.blob()

  return new Promise((onSuccess, onError) => {
    try {
      const reader = new fileReaderConstructor()
      reader.onload = function () {
        onSuccess(this.result as string)
      }
      reader.readAsDataURL(blob)
    } catch (e) {
      onError(e)
    }
  })
}
