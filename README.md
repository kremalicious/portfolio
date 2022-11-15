<p align="center">
  <a href="https://matthiaskretschmann.com"><img src="public/github-header.png" /></a>
 </p>
<h2 align="center">
  👔 Portfolio thingy.
</h2>
<p align="center">
  <a href="https://matthiaskretschmann.com">matthiaskretschmann.com</a>
</p>
<p align="center">
  <a href="https://github.com/kremalicious/portfolio/actions"><img src="https://github.com/kremalicious/portfolio/workflows/CI%2FCD%20Pipeline/badge.svg" /></a>
  <a href="https://codeclimate.com/github/kremalicious/portfolio/maintainability"><img src="https://api.codeclimate.com/v1/badges/8f561ec93e0f8c6b15d9/maintainability" /></a>
  <a href="https://codeclimate.com/github/kremalicious/portfolio/test_coverage"><img src="https://api.codeclimate.com/v1/badges/8f561ec93e0f8c6b15d9/test_coverage" /></a>
</p>

---

- [🎉 Features](#-features)
  - [💍 One data file to rule all pages](#-one-data-file-to-rule-all-pages)
  - [🖼 Project images](#-project-images)
  - [🐱 GitHub repositories](#-github-repositories)
  - [📍 Location](#-location)
  - [💅 Theme switcher](#-theme-switcher)
  - [🏆 SEO component](#-seo-component)
  - [📇 Client-side vCard creation](#-client-side-vcard-creation)
  - [💎 Importing SVG assets](#-importing-svg-assets)
  - [🍬 Typekit component](#-typekit-component)
- [✨ Development](#-development)
  - [🔮 Linting](#-linting)
  - [👩‍🔬 Testing](#-testing)
  - [🎈 Add a new project](#-add-a-new-project)
- [🚚 Deployment](#-deployment)
- [🏛 Licenses](#-licenses)

---

## 🎉 Features

The whole [portfolio](https://matthiaskretschmann.com) is a React-based single page app built with [Next.js](https://nextjs.org) in Typescript, using only statically generated pages.

If you are looking for the former Gatsby-based app, it is archived in the [`gatsby-deprecated`](https://github.com/kremalicious/portfolio/tree/gatsby-deprecated) branch.

### 💍 One data file to rule all pages

All displayed project content is powered by one YAML file where all the portfolio's projects are defined. The project description itself is transformed from Markdown written inside the YAML file into HTML on build time.

Next.js automatically creates pages from each item in that file utilizing the [`[slug].tsx`](src/pages/[slug].tsx) template.

- [`_content/projects.yml`](_content/projects.yml)
- [`src/pages/[slug].tsx`](src/pages/[slug].tsx)

### 🖼 Project images

All project images live under `public/images` and are automatically attached to each project based on the inclusion of the project's `slug` in their filenames.

Next.js with `next/image` generates all required image sizes for delivering responsible, responsive images to visitors, including lazy loading of all images. For this to work, images are analyzed on build time and various image metadata is passed down as props.

- [`src/components/ProjectImage/index.tsx`](src/components/ProjectImage/index.tsx)
- [`src/lib/content.ts`](src/lib/content.ts)

### 🐱 GitHub repositories

The open source section at the bottom of the front page shows selected GitHub repositories, sourced from GitHub.

On build time, all my public repositories are fetched from GitHub, then filtered against the ones defined in `content/repos.yml`, sorted by the last push date, and provided via the `pageContext` of the front page.

If you want to know how, have a look at the respective components:

- [`src/lib/github.ts`](src/lib/github.ts)
- [`_content/repos.json`](_content/repos.json)
- [`src/components/Repository/index.tsx`](src/components/Repository/index.tsx)

### 📍 Location

On client-side, my current and, if known, my next physical location on a city level is fetched from my (private) [nomadlist.com](https://nomadlist.com) profile and displayed in the header.

Fetching is split up into an external serverless function, a hook, and display component. Fetching is done with a serverless function as to not expose the whole profile response into the browser.

If you want to know how, have a look at the respective components:

- [`src/hooks/useLocation.ts`](src/hooks/useLocation.ts)
- [`src/components/Location/index.tsx`](src/components/Location/index.tsx)
- [kremalicious/location](https://github.com/kremalicious/location)

### 💅 Theme switcher

Includes a theme switcher which allows user to toggle between a light and a dark theme. Switching between them also happens automatically based on user's system preferences.

If you want to know how, have a look at the respective components:

- [`src/hooks/useDarkMode.js`](src/hooks/useDarkMode.js)
- [`src/components/ThemeSwitch/index.tsx`](src/components/ThemeSwitch/index.tsx)

### 🏆 SEO component

Includes a SEO component which automatically switches all required `meta` tags for search engines, Twitter Cards, and Facebook OpenGraph tags based on the browsed route/page.

If you want to know how, have a look at the respective component:

- [`src/components/Meta/index.tsx`](src/components/Meta/index.tsx)

### 📇 Client-side vCard creation

The _Add to addressbook_ link in the footer automatically creates a downloadable vCard file on the client-side, based on data defined in `content/meta.yml`.

If you want to know how, have a look at the respective component:

- [`src/components/Vcard/index.tsx`](src/components/Vcard/index.tsx)

### 💎 Importing SVG assets

All SVG assets will be converted to React components with the help of [@svgr/webpack](https://react-svgr.com). Makes use of [SVGR](https://github.com/smooth-code/svgr) so SVG assets can be imported like so:

```js
import Logo from './components/svg/Logo'
return <Logo />
```

### 🍬 Typekit component

Includes a component for adding the Typekit snippet.

If you want to know how, have a look at the respective component:

- [`src/components/Typekit/index.tsx`](src/components/Typekit/index.tsx)

## ✨ Development

```bash
git clone git@github.com:kremalicious/portfolio.git
cd portfolio/

# GITHUB_TOKEN is required for some parts
# See https://docs.github.com/en/github/authenticating-to-github/creating-a-personal-access-token
cp .env.sample .env
vi .env

npm i
npm run dev
```

### 🔮 Linting

ESLint, Prettier, and Stylelint are setup for all linting purposes:

```bash
npm run lint
```

To automatically format all code files:

```bash
npm run format
```

### 👩‍🔬 Testing

Test suite is setup with [Jest](https://jestjs.io) and [react-testing-library](https://github.com/kentcdodds/react-testing-library).

To run all tests, including type checking and linting of all files:

```bash
npm test
```

Most test files live beside the respective component. Testing setup, fixtures, and mocks can be found in the `tests/` folder.

### 🎈 Add a new project

To add a new project, run the following command. This adds a new item to the top of the `projects.yml` file, creating the title & slug from the argument:

```bash
npm run new -- "Hello"
```

Then continue modifying the new entry in [`_content/projects.yml`](_content/projects.yml).

Finally, add as many images as needed with the file name format and put into `public/images/`:

```text
SLUG-01.png
SLUG-02.png
SLUG-03.png
...
```

## 🚚 Deployment

Every branch or Pull Request is automatically deployed by [Vercel](https://vercel.com) with their GitHub integration, where the `main` branch is automatically aliased to `matthiaskretschmann.com`. A link to a preview deployment will appear under each Pull Request.

A backup deployment is also happening to a S3 bucket, triggered by pushes to `main` and executed via GitHub Actions. The deploy command simply calls the [`scripts/deploy-s3.sh`](scripts/deploy-s3.sh) script, syncing the contents of the `public/` folder to S3:

```bash
npm run deploy:s3
```

Upon live deployment, deploy script also pings search engines. GitHub requires the following environment variables to be setup for successful deployments in the repository secrets:

- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`
- `AWS_DEFAULT_REGION`

## 🏛 Licenses

**© Copyright 2022 Matthias Kretschmann**

All images and projects are plain ol' copyright, most displayed projects are subject to the copyright of their respective owners.

Don't care if you fork & play with it, but you're not allowed to publish anything from it as a whole without my written permission. Also please be aware, the combination of typography, colors & layout makes up my brand identity. So please don't just clone everything, but rather do a remix!

All the rest, like all code and documentation, is under:

**The MIT License**

[Full MIT license text](LICENSE)
