const path = require('path')
const fs = require('fs')
const yaml = require('js-yaml')
const meta = yaml.load(fs.readFileSync('./content/meta.yml', 'utf8'))
const { title, url, matomoSite, matomoUrl } = meta[0]

module.exports = {
  siteMetadata: {
    siteUrl: `${url}`
  },
  plugins: [
    {
      resolve: 'gatsby-transformer-yaml',
      options: {
        plugins: [
          {
            resolve: 'gatsby-source-filesystem',
            options: {
              name: 'content',
              path: path.join(__dirname, 'content')
            }
          }
        ]
      }
    },
    {
      resolve: 'gatsby-transformer-json',
      options: {
        plugins: [
          {
            resolve: 'gatsby-source-filesystem',
            options: {
              name: 'pkg',
              path: path.join(__dirname, 'package.json')
            }
          }
        ]
      }
    },
    {
      resolve: 'gatsby-plugin-sass',
      options: {
        includePaths: [`${__dirname}/node_modules`, `${__dirname}/src/styles`]
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: path.join(__dirname, 'src', 'images')
      }
    },
    {
      resolve: 'gatsby-plugin-svgr',
      options: {
        icon: true
      }
    },
    {
      resolve: 'gatsby-plugin-matomo',
      options: {
        siteId: `${matomoSite}`,
        siteUrl: `${url}`,
        matomoUrl: `${matomoUrl}`,
        localScript: '/piwik.js'
      }
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: title.toLowerCase(),
        short_name: 'mk',
        start_url: '/',
        background_color: '#e7eef4',
        theme_color: '#88bec8',
        icon: 'src/images/favicon.png',
        display: 'minimal-ui',
        cache_busting_mode: 'name'
      }
    },
    'gatsby-plugin-react-helmet',
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    'gatsby-plugin-sitemap',
    'gatsby-plugin-offline'
  ]
}
