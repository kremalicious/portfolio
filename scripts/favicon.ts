import fs from 'fs'
import path from 'path'
import sharp from 'sharp'
import ico from 'sharp-ico'

const imagesSourcePath = path.resolve(path.join(process.cwd(), 'src', 'images'))
const faviconSource = `${imagesSourcePath}/favicon-512.png`
const faviconSourceSvg = `${imagesSourcePath}/favicon.svg`

const outputWebRoot = path.resolve(path.join(process.cwd(), 'public'))
const outputManifest = path.resolve(
  path.join(process.cwd(), 'public', 'manifest')
)

// All the sizes and meta we'll need
// https://evilmartians.com/chronicles/how-to-favicon-in-2021-six-files-that-fit-most-needs
const sizes = [32, 180, 192, 512]
const outputMeta = `
  <link rel="icon" href="/favicon.ico" sizes="any" />
  <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
  <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
  <link rel="manifest" href="/manifest/manifest.webmanifest" />
`

function createManifest(iconsizes: number[]) {
  const manifest = {
    name: 'matthias kretschmann',
    short_name: 'mk',
    display: 'standalone',
    start_url: '/',
    icons: iconsizes.map((size) => ({
      src: `/manifest/favicon-${size}.png`,
      type: 'image/png',
      sizes: `${size}x${size}`
    }))
  }
  fs.writeFileSync(
    `${outputManifest}/manifest.webmanifest`,
    JSON.stringify(manifest)
  )
}

function nuke() {
  fs.rmSync(outputManifest, { recursive: true, force: true })
  fs.rmSync(`${outputWebRoot}/apple-touch-icon.png`, { force: true })
  fs.rmSync(`${outputWebRoot}/favicon.ico`, { force: true })
  fs.rmSync(`${outputWebRoot}/favicon.svg`, { force: true })
  fs.mkdirSync(outputManifest, { recursive: true })
}

async function buildFavicons() {
  try {
    // Nuke all & create output folder first
    nuke()

    // copy over the svg, as it's handcrafted
    fs.copyFileSync(faviconSourceSvg, `${outputWebRoot}/favicon.svg`)

    // generate all the rest
    await Promise.all(
      sizes.map(async (size) => {
        let destination = `${outputManifest}/favicon-${size}.png`
        if (size === 180) destination = `${outputWebRoot}/apple-touch-icon.png`

        // 32px size only used for favicon.ico
        if (size === 32) {
          await ico.sharpsToIco(
            [sharp(faviconSource)],
            `${outputWebRoot}/favicon.ico`,
            { sizes: [32, 24, 16], resizeOptions: {} }
          )
          fs.rmSync(destination, { force: true })
        } else {
          await sharp(faviconSource).resize(size, size).toFile(destination)
        }
      })
    )

    // write out manifest
    createManifest([192, 512])

    console.log(`
      -----------------------------
      Favicon generation complete!
      -----------------------------
      Add this to src/components/Meta/Favicon.tsx:
      ${outputMeta}
    `)
  } catch (error) {
    console.error(error.message)
  }
}

buildFavicons()
