import { mock } from 'bun:test'

type ReadFileMock = ReturnType<
  typeof mock<(path: string, encoding: string) => Promise<string>>
>
type WriteFileMock = ReturnType<
  typeof mock<(path: string, data: string, encoding: string) => Promise<void>>
>
type MkdirMock = ReturnType<
  typeof mock<(path: string, options: { recursive: boolean }) => Promise<void>>
>

export const readFileMock: ReadFileMock = mock(async () => '')
export const writeFileMock: WriteFileMock = mock(async () => {})
export const mkdirMock: MkdirMock = mock(async () => {})

export function setupFsMocks(): void {
  mock.module('node:fs/promises', () => ({
    readFile: readFileMock,
    writeFile: writeFileMock,
    mkdir: mkdirMock
  }))
}
