export async function imageToDataUrl(path: string): Promise<string> {
  const response = await fetch(path)
  const blob = await response.blob()
  return new Promise((onSuccess, onError) => {
    try {
      const reader = new FileReader()
      reader.onload = function () {
        onSuccess(this.result as string)
      }
      reader.readAsDataURL(blob)
    } catch (e) {
      onError(e)
    }
  })
}
