import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'
import { defineConfig, fontProviders } from 'astro/config'
import { loadEnv } from 'vite'
import meta from './src/_content/meta.json'

const env = loadEnv(process.env.NODE_ENV ?? '', process.cwd(), '')
const adobeId = env.ADOBE_ID

// https://astro.build/config
export default defineConfig({
  output: 'static',
  integrations: [react(), sitemap()],
  site: meta.url,
  experimental: {
    fonts: [
      {
        name: 'Brandon Grotesque',
        cssVariable: '--font-brandon-grotesque',
        provider: fontProviders.adobe({ id: adobeId }),
        weights: [400],
        styles: ['normal'],
        featureSettings: 'liga'
      },
      {
        name: 'FF Tisa Sans Pro',
        cssVariable: '--font-ff-tisa-sans-pro',
        provider: fontProviders.adobe({ id: adobeId }),
        weights: [400, 700],
        styles: ['normal', 'italic'],
        featureSettings: 'liga'
      }
    ]
  },
  devToolbar: {
    enabled: false
  }
})
