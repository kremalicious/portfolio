import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import type { Repo } from '../types/repo'

export const cacheFilePath = join(process.cwd(), '.cache', 'github-repos.json')

export async function readReposCache(): Promise<Repo[] | null> {
  try {
    const cacheRaw = await readFile(cacheFilePath, 'utf8')
    const parsed = JSON.parse(cacheRaw) as Repo[]
    if (!Array.isArray(parsed)) return null
    return parsed
  } catch (error: unknown) {
    const nodeError = error as NodeJS.ErrnoException
    if (nodeError?.code !== 'ENOENT') console.error(nodeError.message)
    return null
  }
}

export async function saveReposCache({
  repos
}: {
  repos: Repo[]
}): Promise<void> {
  if (repos.length === 0) return
  try {
    await mkdir(dirname(cacheFilePath), { recursive: true })
    await writeFile(cacheFilePath, JSON.stringify(repos), 'utf8')
  } catch (error: unknown) {
    console.error((error as Error).message)
  }
}
