const path = require('path')
const fs = require('fs')
const yaml = require('js-yaml')
const meta = yaml.load(fs.readFileSync('./data/meta.yml', 'utf8'))
const { url, matomoSite, matomoUrl, title, tagline } = meta

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
              name: 'data',
              path: path.join(__dirname, 'data')
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
        display: 'minimal-ui',
        icon: 'src/images/favicon.png'
      }
    },
    'gatsby-plugin-react-helmet',
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    'gatsby-plugin-sitemap',
    'gatsby-plugin-offline'
  ]
}
