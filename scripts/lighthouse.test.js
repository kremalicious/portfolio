import * as chromeLauncher from 'chrome-launcher'
import { test } from 'ava'
import lighthouse from 'lighthouse'
import { siteMetadata } from '../gatsby-config'

const launchChromeAndRunLighthouse = (
  url,
  opts = { chromeFlags: ['--headless'] },
  config = null
) =>
  chromeLauncher.launch({ chromeFlags: opts.chromeFlags }).then(chrome => {
    opts.port = chrome.port
    return lighthouse(url, opts, config).then(results =>
      chrome.kill().then(() => results.lhr)
    )
  })

let scores
test.before(async () => {
  console.log(`Auditing ${siteMetadata.siteUrl}.\n`) // eslint-disable-line no-console
  scores = await launchChromeAndRunLighthouse(siteMetadata.siteUrl).then(
    ({ categories }) => categories
  )
})

const logScore = score => `Is ${score * 100}.`

const testOutput = (t, metric) => {
  const { score } = scores[metric]
  t.log(logScore(score))
  return score >= 0.9 ? t.pass() : t.fail()
}

test('Performance Score above 90', t => {
  testOutput(t, 'performance')
})

test('PWA Score above 90', t => {
  testOutput(t, 'pwa')
})

test('Accessibility Score above 90', t => {
  testOutput(t, 'accessibility')
})

test('Best Practices Score above 90', t => {
  testOutput(t, 'best-practices')
})

test('SEO Score above 90', t => {
  testOutput(t, 'seo')
})
