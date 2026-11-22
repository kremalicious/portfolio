import fs from 'node:fs'
import path from 'node:path'
import ora from 'ora'
import slugify from 'slugify'

const templatePath = path.join(process.cwd(), 'scripts', 'new.yml')
const template = fs.readFileSync(templatePath).toString()

const spinner = ora('Adding new project').start()

if (!process.argv[2]) {
  spinner.fail('Use the format `bun run new -- "Title of project"`')
  process.exit(1)
}

const title = process.argv[2]
spinner.text = `Adding '${title}'.`

const titleSlug = slugify(title, { lower: true })
const projects = path.join(process.cwd(), 'src', '_content', 'projects.yml')
const newContents = template
  .split('TITLE')
  .join(title)
  .split('SLUG')
  .join(titleSlug)

const data = fs.readFileSync(projects, 'utf8')
fs.writeFileSync(projects, `${newContents}\n${data}`)
spinner.succeed(`Added '${title}' to top of projects.yml file.`)
