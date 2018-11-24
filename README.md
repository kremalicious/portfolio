<p align="center">
  <a href="https://matthiaskretschmann.com"><img src="src/images/github-header.png" /></a>
 </p>
<p align="center">
  <strong>👔 Portfolio thingy, built with <a href="https://www.gatsbyjs.org">Gatsby</a>.</strong>
</p>
<p align="center">
  <a href="https://matthiaskretschmann.com">matthiaskretschmann.com</a>
</p>
<p align="center">
  <a href="https://travis-ci.com/kremalicious/portfolio"><img src="https://travis-ci.com/kremalicious/portfolio.svg?branch=master" /></a>
  <a href="https://codeclimate.com/github/kremalicious/portfolio/maintainability"><img src="https://api.codeclimate.com/v1/badges/8f561ec93e0f8c6b15d9/maintainability" /></a>
  <a href="https://greenkeeper.io/"><img src="https://badges.greenkeeper.io/kremalicious/portfolio.svg" /></a>
</p>

## Table of Contents

- [🎉 Features](#-features)
  - [⛵️ Lighthouse score](#-lighthouse-score)
  - [💍 One data file to rule all pages](#-one-data-file-to-rule-all-pages)
  - [💅 Theme switcher](#-theme-switcher)
  - [🏆 SEO component](#-seo-component)
  - [📇 Client-side vCard creation](#-client-side-vcard-creation)
  - [💫 Page transitions](#-page-transitions)
  - [📈 Matomo (formerly Piwik) analytics tracking](#-matomo-formerly-piwik-analytics-tracking)
  - [🖼 Project images](#-project-images)
  - [💎 Importing SVG assets](#-importing-svg-assets)
  - [🍬 Typekit component](#-typekit-component)
- [✨ Development](#-development)
  - [🔮 Linting](#-linting)
  - [🎈 Add a new project](#-add-a-new-project)
- [🚚 Deployment](#-deployment)
- [🏛 Licenses](#-licenses)

---

## 🎉 Features

The whole [portfolio](https://matthiaskretschmann.com) is a React-based Single Page App built with [Gatsby v2](https://www.gatsbyjs.org).

### ⛵️ Lighthouse score

[![Lighthouse scores](https://lighthouse.now.sh/?perf=100&pwa=100&a11y=100&bp=100&seo=100)](https://travis-ci.com/kremalicious/portfolio)

### 💍 One data file to rule all pages

All content is powered by one YAML file where all the portfolio's projects are defined. The project description itself is transformed from Markdown written inside the YAML file.

Gatsby automatically creates pages from each item in that file utilizing the [`Project.jsx`](src/templates/Project.jsx) template.

- [`data/projects.yml`](data/projects.yml)
- [`src/templates/Project.jsx`](src/templates/Project.jsx)

### 💅 Theme switcher

Includes a theme switcher which allows user to toggle between a light and a dark theme. Switching between them also happens automatically based on user's local sunset and sunrise times. Uses Cloudflare's geo location HTTP header functionality.

If a visitor has set the theme manually that selection is remembered in localStorage, and is restored on next visit.

If you want to know how, have a look at the respective components:

- [`src/components/molecules/ThemeSwitch.jsx`](src/components/molecules/ThemeSwitch.jsx)
- [`src/store/provider.jsx`](src/store/provider.jsx)

### 🏆 SEO component

Includes a SEO component which automatically switches all required `meta` tags for search engines, Twitter Cards, and Facebook OpenGraph tags based on the browsed route/page.

If you want to know how, have a look at the respective component:

- [`src/components/atoms/SEO.jsx`](src/components/atoms/SEO.jsx)

### 📇 Client-side vCard creation

The _Add to addressbook_ link in the footer automatically creates a downloadable vCard file on the client-side, based on data defined in `data/meta.yml`.

If you want to know how, have a look at the respective component:

- [`src/components/atoms/Vcard.jsx`](src/components/atoms/Vcard.jsx)

### 💫 Page transitions

Includes mechanism for transitioning between route changes with full page transitions defined with [react-pose](https://popmotion.io/pose/). Mechanism ~~stolen~~ inspired by [gatsby-universal](https://github.com/fabe/gatsby-universal).

If you want to know how, have a look at the respective components:

- [`src/components/Layout.jsx`](src/components/Layout.jsx)
- [`src/helpers/wrapPageElement.jsx`](src/helpers/wrapPageElement.jsx)
- [`gatsby-browser.js`](gatsby-browser.js)
- [`gatsby-ssr.js`](gatsby-ssr.js)

### 📈 Matomo (formerly Piwik) analytics tracking

Site sends usage statistics to my own [Matomo](https://matomo.org) installation. To make this work in Gatsby, I created and open sourced a plugin, [gatsby-plugin-matomo](https://github.com/kremalicious/gatsby-plugin-matomo), which is in use on this site.

- [gatsby-plugin-matomo](https://github.com/kremalicious/gatsby-plugin-matomo)

### 🖼 Project images

All project images live under `src/images` and are automatically attached to each project based on the inclusion of the project's `slug` in their filenames.

All project images make use of the excellent [gatsby-image](https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-image) plugin, working in tandem with [gatsby-plugin-sharp](https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-plugin-sharp) and [gatsby-transformer-sharp](https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-transformer-sharp).

All together, Gatsby automatically generates all required image sizes for delivering responsible, responsive images to visitors, including lazy loading of all images. Also includes the [intersection-observer polyfill](https://github.com/w3c/IntersectionObserver) to make lazy loading work properly in Safari.

All project images use one single component where one main GraphQL query fragment is defined, which then gets used throughout other GraphQL queries.

- [`src/components/molecules/ProjectImage.jsx`](src/components/molecules/ProjectImage.jsx)

### 💎 Importing SVG assets

All SVG assets under `src/images/` will be converted to React components with the help of [gatsby-plugin-svgr](https://github.com/zabute/gatsby-plugin-svgr). Makes use of [SVGR](https://github.com/smooth-code/svgr) so SVG assets can be imported like so:

```js
import { ReactComponent as Logo } from './components/svg/Logo'

<Logo />
```

### 🍬 Typekit component

Includes a component for adding the Typekit snippet.

If you want to know how, have a look at the respective component:

- [`src/components/atoms/Typekit.jsx`](src/components/atoms/Typekit.jsx)

## ✨ Development

You can simply use [Docker](https://www.docker.com) & [Docker Compose](https://docs.docker.com/compose/) or install and run dependencies on your local system.

```bash
git clone git@github.com:kremalicious/portfolio.git
cd portfolio/

# use Docker
docker-compose up

# or go with local system
npm i
npm start
```

### 🔮 Linting

ESlint, Prettier, and Stylelint are setup for all linting purposes:

```bash
npm run lint
```

To automatically format all code files:

```bash
npm run format
npm run format:css
```

### 🎈 Add a new project

To add a new project, run the following command. This adds a new item to the top of the `projects.yml` file, creating the title & slug from the argument:

```bash
npm run new -- "Hello"
```

Then continue modifying the new entry in [`data/projects.yml`](data/projects.yml).

Finally, add as many images as needed with the file name format and put into `src/images/`:

```
portfolio-SLUG-01.png
portfolio-SLUG-02.png
portfolio-SLUG-03.png
...
```

## 🚚 Deployment

Automatic deployments are triggered upon successful tests & builds on Travis:

- push to `master` initiates a live deployment
- any Pull Request, and subsequent pushes to it, initiates a beta deployment

The deploy command simply calls the [`scripts/deploy.sh`](scripts/deploy.sh) script, syncing the contents of the `public/` folder to S3:

```bash
npm run deploy
```

The deploymeng script can be used locally too, the branch checks are only happening for Travis builds, allowing to deploy any branch from local machine.

## 🏛 Licenses

All images and projects are plain ol' copyright:

**© Copyright 2018 Matthias Kretschmann**

Most displayed projects are subject to the copyright of their respective owners.

All the rest, like all code and documentation, is under:

**The MIT License**

[Full MIT license text](LICENSE)
