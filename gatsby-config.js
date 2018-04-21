const meta = require('./data/meta.json')
const { url, googleanalytics } = meta

module.exports = {
  siteMetadata: {
    siteUrl: `${url}`,
  },
  plugins: [
    'gatsby-plugin-react-next',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sitemap',
    'gatsby-transformer-json',
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    'gatsby-plugin-offline',
    'gatsby-plugin-sitemap',
    {
      resolve: 'gatsby-plugin-sass',
      options: {
        includePaths: [
          `${__dirname}/node_modules`,
          `${__dirname}/src/styles`
        ]
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'data',
        path: `${__dirname}/data/`,
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/images`,
      }
    },
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: `${googleanalytics}`,
        head: false,
        anonymize: true,
        respectDNT: true,
      }
    }
  ]
}
