const meta = require('./data/meta.json')
const { url, googleanalytics } = meta

module.exports = {
  siteMetadata: {
    siteUrl: `${url}`,
  },
  plugins: [
    {
      resolve: 'gatsby-plugin-sass',
      options: {
        includePaths: [
          `${__dirname}/node_modules`,
          `${__dirname}/src/styles`
        ],
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'data',
        path: `${__dirname}/data/`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/images/`,
      },
    },
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: `${googleanalytics}`,
        head: false,
        anonymize: true,
        respectDNT: true,
      },
    },
    {
      resolve: 'gatsby-plugin-svgr',
      options: {
        icon: false,
        viewBox: true,
        // see https://github.com/smooth-code/svgr for a list of all options
      },
    },
    'gatsby-plugin-react-next',
    'gatsby-plugin-react-helmet',
    'gatsby-transformer-json',
  ],
}
