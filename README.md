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
  <a href="https://qlty.sh/gh/kremalicious/projects/portfolio"><img src="https://qlty.sh/gh/kremalicious/projects/portfolio/maintainability.svg" alt="Maintainability" /></a>
</p>

---

- [🎉 Features](#-features)
  - [💍 One data file to rule all pages](#-one-data-file-to-rule-all-pages)
  - [🖼 Project images](#-project-images)
  - [🐱 GitHub repositories](#-github-repositories)
  - [📍 Location](#-location)
  - [💅 Theme switcher](#-theme-switcher)
  - [📇 Client-side vCard creation](#-client-side-vcard-creation)
- [🤓 Scripts](#-scripts)
  - [🎈 Add a new project](#-add-a-new-project)
  - [🌄 Favicon generation](#-favicon-generation)
- [✨ Development](#-development)
  - [🔮 Linting](#-linting)
  - [👩‍🔬 Testing](#-testing)
- [🚚 Deployment](#-deployment)
- [🏛 Licenses](#-licenses)

---

## 🎉 Features

The whole [portfolio](https://matthiaskretschmann.com) is created with [Astro](https://astro.build), using statically generated pages with a pinch of [web components](https://developer.mozilla.org/en-US/docs/Web/API/Web_components).

The whole tech stack:

- [Astro](https://astro.build)
- [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS) + [CSS Modules](https://github.com/css-modules/css-modules)
- [TypeScript](https://www.typescriptlang.org)
- [Web Components](https://developer.mozilla.org/en-US/docs/Web/API/Web_components)
- [Biome](https://biomejs.dev)
- [Bun](https://bun.com)

> If you are looking for the former Next.js-based app, it is archived in the [`nextjs-deprecated`](https://github.com/kremalicious/portfolio/tree/nextjs-deprecated) branch.

> If you are looking for the former Gatsby-based app, it is archived in the [`gatsby-deprecated`](https://github.com/kremalicious/portfolio/tree/gatsby-deprecated) branch.

### 💍 One data file to rule all pages

All displayed project content is powered by one YAML file where all the portfolio's projects are defined. The project description itself is transformed from Markdown written inside the YAML file into HTML on build time.

Astro automatically creates pages from each item in that file in the [`[slug].astro`](src/pages/[slug].astro) page template. Utilizing the [`get-projects.ts`](src/features/projects/lib/get-projects.ts) script which validates, transforms and enhances the data.

- [`projects.yml`](src/_content/projects.yml)
- [`get-projects.ts`](src/features/projects/lib/get-projects.ts)
- [`[slug].astro`](src/pages/[slug].astro)

### 🖼 Project images

All project images live under `src/_content/images` and are automatically attached to each project based on the inclusion of the project's `slug` in their filenames during the above mentioned `get-projects.ts` pipeline.

During production build, the dominant color for each image is extracted with sharp, and then used for the initial loading state for each image. Astro generates all required image sizes for delivering responsible, responsive images to visitors.

- [`ProjectImage.astro`](src/features/projects/components/ProjectImage/ProjectImage.astro)
- [`get-project-images.ts`](src/features/projects/lib/get-project-images.ts)

### 🐱 GitHub repositories

The open source section at the bottom of the front page shows selected GitHub repositories, sourced from GitHub.

On build time, all my public repositories are fetched from GitHub, then filtered against the ones defined in `repos.json`, sorted by the last push date.

If you want to know how, have a look at the respective components:

- [`get-repos.ts`](src/features/repositories/lib/get-repos.ts)
- [`repos.json`](src/_content/repos.json)
- [`Repository.astro`](src/features/repositories/components/Repository.astro)

### 📍 Location

On client-side, my current and, if known, my next physical location on a city level is fetched from my (private) [lugara.me](https://lugara.me) profile and displayed in the header.

If you want to know how, have a look at the respective components:

- [`get-location.ts`](src/features/location/api/get-location.ts)
- [`Location.astro`](src/features/location/components/Location.astro)
- [`location-element.ts`](src/features/location/components/location-element.ts)
- [kremalicious/location](https://github.com/kremalicious/location)
- [lugara.me](https://lugara.me)

### 💅 Theme switcher

Includes a theme switcher which allows user to toggle between a light and a dark theme. Done without any dependencies:

- before document renders, the theme is set based on system preference or session storage user preference in the `<head>`
- the theme switch component then listens/dispatches a custom event to sync its UI

If you want to know how this works in detail, have a look at the respective files:

- [`theme.ts`](src/features/theme-switch/lib/theme.ts)
- [`theme-switch-element.ts`](src/features/theme-switch/components/theme-switch-element.ts)
- [`ThemeSwitch.astro`](src/features/theme-switch/components/ThemeSwitch.astro)

### 📇 Client-side vCard creation

The _Add to addressbook_ link in the footer automatically creates a downloadable vCard file on the client-side, based on data defined in `src/_content/meta.json`.

If you want to know how, have a look at the respective component:

- [`Vcard.astro`](src/features/vcard/components/Vcard.astro)
- [`vcard-element.ts`](src/features/vcard/components/vcard-element.ts)
- [`vcard.ts`](src/features/vcard/lib/vcard.ts)

## 🤓 Scripts

### 🎈 Add a new project

To add a new project, run the following command. This adds a new item to the top of the `projects.yml` file, creating the title & slug from the argument:

```bash
bun run new -- "Hello"
```

Then continue modifying the new entry in [`src/_content/projects.yml`](src/_content/projects.yml).

Finally, add as many images as needed with the file name format and put into `src/_content/images/`:

```text
SLUG-01.png
SLUG-02.png
SLUG-03.png
...
```

### 🌄 Favicon generation

This generates all required favicon sizes and puts them in `public/` folder. All sourced from:

- `src/assets/favicon-512.png`
- `src/assets/favicon.svg` (handcrafted, adaptive based on OS theme)

Also creates a web manifest.

```bash
bun run favicon
```

## ✨ Development

Requires [Bun](https://bun.com) to be installed.

```bash
git clone git@github.com:kremalicious/portfolio.git
cd portfolio/

cp .env.example .env
vi .env

bun i
bun run dev
```

### 🔮 Linting

[Biome](https://biomejs.dev) is setup for all linting and formatting purposes:

```bash
bun run lint
```

### 👩‍🔬 Testing

Test suite is setup with [Bun Test Runner](https://bun.com) for unit tests.

To run all tests:

```bash
bun run test
```

Most test files live beside the respective component. Testing setup, fixtures, and mocks can be found in the `test/` folder.

## 🚚 Deployment

Every branch or Pull Request is automatically deployed by [Vercel](https://vercel.com) with their GitHub integration, where the `main` branch is automatically aliased to `matthiaskretschmann.com`. A link to a preview deployment will appear under each Pull Request.

## 🏛 Licenses

**© Copyright 2025 Matthias Kretschmann**

All images and projects are plain ol' copyright, most displayed projects are subject to the copyright of their respective owners.

Don't care if you fork & play with it, but you're not allowed to publish anything from it as a whole without my written permission. Also please be aware, the combination of typography, colors & layout makes up my brand identity. So please don't just clone everything, but rather do a remix!

All the rest, like all code and documentation, is under:

**The MIT License**

[Full MIT license text](LICENSE)
