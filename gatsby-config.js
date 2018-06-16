const path = require('path')
const fs = require('fs')
const yaml = require('js-yaml')
const meta = yaml.load(fs.readFileSync('./data/meta.yml', 'utf8'))
const { url, matomoUrl, matomoSite } = meta

module.exports = {
  siteMetadata: {
    siteUrl: `${url}`
  },
  plugins: [
    'gatsby-plugin-react-next',
    'gatsby-plugin-react-helmet',
    'gatsby-transformer-yaml',
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    'gatsby-plugin-sitemap',
    'gatsby-plugin-offline',
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
        name: 'data',
        path: path.join(__dirname, 'data')
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
      resolve: 'gatsby-plugin-svgr',
      options: {
        icon: false,
        viewBox: true
        // see https://github.com/smooth-code/svgr for a list of all options
      }
    },
    {
      resolve: 'gatsby-plugin-favicon',
      options: {
        logo: './src/images/favicon.png',
        injectHTML: true,
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
    }
  ]
}
