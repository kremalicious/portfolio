#!/usr/bin/env ts-node
import fs from 'node:fs'
import path from 'node:path'
import ora from 'ora'
import slugify from 'slugify'

const templatePath = path.join(process.cwd(), 'scripts', 'new.yml')
const template = fs.readFileSync(templatePath).toString()

const spinner = ora('Adding new project').start()

if (!process.argv[2]) {
  spinner.fail('Use the format `npm run new -- Title of project`')
}

const title = process.argv[2]
spinner.text = `Adding '${title}'.`

const titleSlug = slugify(title, { lower: true })
const projects = path.join(process.cwd(), '_content', 'projects.yml')
const newContents = template
  .split('TITLE')
  .join(title)
  .split('SLUG')
  .join(titleSlug)

// prepend newContents to projects.yml file
fs.readFile(projects, 'utf8', (error, data) => {
  if (error) spinner.fail(error.message)

  fs.writeFile(projects, newContents + data, (error) => {
    if (error) spinner.fail(error.message)

    spinner.succeed(`Added '${title}' to top of projects.yml file.`)
  })
})
