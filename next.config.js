// @ts-check

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  webpack: (config) => {
    // Grab the existing rule that handles SVG imports
    const fileLoaderRule = config.module.rules.find((rule) =>
      rule.test?.test?.('.svg')
    )

    config.module.rules.push(
      // Reapply the existing rule, but only for svg imports ending in ?url
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/ // *.svg?url
      },
      // Convert all other *.svg imports to React components
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] }, // exclude if *.svg?url
        use: [{ loader: '@svgr/webpack', options: { icon: true } }]
      }
    )

    // Modify the file loader rule to ignore *.svg, since we have it handled now.
    fileLoaderRule.exclude = /\.svg$/i

    config.module.rules.push({
      test: /\.gif$/,
      // yay for webpack 5
      // https://webpack.js.org/guides/asset-management/#loading-images
      type: 'asset/resource'
    })

    return config
  },

  eslint: {
    // Using Biome instead of ESLint,
    // sadly Next.js doesn't have a way to disable ESLint
    // see https://github.com/vercel/next.js/discussions/59347
    ignoreDuringBuilds: true
  }
}

export default nextConfig
