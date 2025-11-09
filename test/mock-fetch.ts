interface CreateFetchMockParams {
  body?: unknown
  error?: Error
}

export function createFetchMock({
  body = {},
  error
}: CreateFetchMockParams): typeof fetch {
  if (error) {
    const rejectMock = async (..._parameters: Parameters<typeof fetch>) => {
      throw error
    }
    return Object.assign(rejectMock, {
      preconnect: async () => {}
    })
  }

  const resolveMock = async (..._parameters: Parameters<typeof fetch>) =>
    new Response(JSON.stringify(body))

  return Object.assign(resolveMock, {
    preconnect: async () => {}
  })
}
