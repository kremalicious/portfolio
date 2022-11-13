import { favicons, FaviconImage } from 'favicons'
import path from 'path'
import fs from 'fs'

const imagesDirectory = path.resolve(path.join(process.cwd(), 'src', 'images'))
const source = `${imagesDirectory}/favicon.png`
const output = path.resolve(path.join(process.cwd(), 'public', 'favicon'))

const configuration = {
  path: '/favicon', // Path for overriding default icons path. `string`
  appName: 'matthias kretschmann',
  appShortName: 'mk',
  appDescription: null,
  developerName: null,
  developerURL: null,
  dir: 'auto',
  lang: 'en-US',
  appleStatusBarStyle: 'black-translucent', // Style for Apple status bar: "black-translucent", "default", "black". `string`
  display: 'minimal-ui', // Preferred display mode: "fullscreen", "standalone", "minimal-ui" or "browser". `string`
  orientation: 'any', // Default orientation: "any", "natural", "portrait" or "landscape". `string`
  scope: '/', // set of URLs that the browser considers within your app
  start_url: '/?homescreen=1',
  background_color: '#e7eef4',
  theme_color: '#e7eef4',
  preferRelatedApplications: false,
  relatedApplications: undefined,
  version: '1.0',
  pixel_art: false, // Keeps pixels "sharp" when scaling up, for pixel art.  Only supported in offline mode.
  loadManifestWithCredentials: false,
  manifestMaskable: `${imagesDirectory}/logo.svg`, // Maskable source image(s) for manifest.json. "true" to use default source. More information at https://web.dev/maskable-icon/. `boolean`, `string`, `buffer` or array of `string`
  icons: {
    android: true,
    appleIcon: true,
    appleStartup: false,
    favicons: true,
    windows: true,
    yandex: false
  }
}

async function buildFavicons() {
  try {
    const response = await favicons(source, configuration)
    const allFilesToWrite = response.images.concat(response.files as any)

    fs.rmSync(output, { recursive: true, force: true })

    allFilesToWrite.forEach((file) => {
      const { name, contents } = file
      const destination = `${output}/${name}`

      try {
        fs.readFileSync(destination, 'utf8')
      } catch (error) {
        // if there is no file, get data and write a fresh file
        if (error.code === 'ENOENT') {
          try {
            fs.mkdirSync(output, { recursive: true })
            fs.writeFileSync(destination, contents)
          } catch (error) {
            throw new Error("Couldn't write favicon file")
          }
        }
      }
    })

    const destinationHtml = `${output}/_meta.html`

    try {
      fs.readFileSync(destinationHtml, 'utf8')
    } catch (error) {
      // if there is no file, get data and write a fresh file
      if (error.code === 'ENOENT') {
        try {
          fs.mkdirSync(output, { recursive: true })
          fs.writeFileSync(
            destinationHtml,
            response.html.reverse().toString().replaceAll(',', '')
          )
        } catch (error) {
          throw new Error("Couldn't write favicon file")
        }
      }
    }
  } catch (error) {
    console.error(error.message)
  }
}

buildFavicons()
