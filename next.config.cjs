// @ts-check

/**
 * @type {import('next').NextConfig}
 */

module.exports = (phase, { defaultConfig }) => {
  const nextConfig = {
    webpack: (config, options) => {
      config.module.rules.push(
        {
          test: /\.svg$/,
          issuer: /\.(tsx|ts)$/,
          use: [{ loader: '@svgr/webpack', options: { icon: true } }]
        },
        {
          test: /\.gif$/,
          // yay for webpack 5
          // https://webpack.js.org/guides/asset-management/#loading-images
          type: 'asset/resource'
        }
      )

      return typeof defaultConfig.webpack === 'function'
        ? defaultConfig.webpack(config, options)
        : config
    }
  }

  return nextConfig
}
