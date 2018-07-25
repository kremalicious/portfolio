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
      resolve: 'gatsby-plugin-favicon',
      options: {
        logo: './src/images/favicon.png',
        injectHTML: true,

        // WebApp Manifest Configuration
        appName: title.toLowerCase(),
        appDescription: tagline.toLowerCase(),
        developerName: title,
        developerURL: url,
        dir: 'auto',
        lang: 'en-US',
        background: '#e7eef4',
        theme_color: '#88bec8',
        display: 'standalone',
        orientation: 'any',
        start_url: '/?homescreen=1',
        version: '1.0',

        icons: {
          android: true,
          appleIcon: true,
          appleStartup: false,
          coast: false,
          favicons: true,
          firefox: true,
          twitter: false,
          yandex: true,
          windows: true
        }
      }
    },
    'gatsby-plugin-react-helmet',
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    'gatsby-plugin-sitemap'
    // 'gatsby-plugin-offline'
  ]
}
