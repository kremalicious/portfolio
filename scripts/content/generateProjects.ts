import fs from 'fs'
import yaml from 'js-yaml'
import ora from 'ora'
import { join } from 'path'
import type ProjectType from '../../src/types/project.js'
import { transformProject } from './transformProject.js'

const contentDirectory = join(process.cwd(), '_content')
const projectsOriginal = yaml.load(
  fs.readFileSync(`${contentDirectory}/projects.yml`, 'utf8')
) as ProjectType[]
const projectsOutput = 'generated/projects.json'

export async function generateProjects(): Promise<void> {
  const spinner = ora('Generating projects content...\n').start()
  const slugs = projectsOriginal.map(({ slug }: { slug: string }) => slug)

  try {
    const projects: ProjectType[] = []

    for (const slug of slugs) {
      spinner.text = `Generating content for ${slug}...\n`
      const project = await transformProject(projectsOriginal, slug)
      if (project) projects.push(project)
    }

    fs.writeFileSync(projectsOutput, JSON.stringify(projects, null, 2))
    spinner.succeed(`Projects content written to ${projectsOutput}\n`)
  } catch (error: unknown) {
    spinner.fail((error as Error).message)
  }
}
