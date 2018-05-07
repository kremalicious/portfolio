import React, { Fragment } from 'react'
const fs = require('fs')
const yaml = require('js-yaml')
const meta = yaml.load(fs.readFileSync('./data/meta.yml', 'utf8'))
const { url, matomoDomain, matomoSite } = meta

// add Matomo tracking code
// adapted from:
// https://github.com/scottnonnenberg/blog/blob/master/html.js#L58
exports.onRenderBody = ({ setPostBodyComponents, pathname }) => {
  if (process.env.NODE_ENV === 'production') {
    if (!(navigator.doNotTrack == '1' || window.doNotTrack == '1')) {
      const js = `
        window._paq = window._paq || [];
        window._paq.push(['setTrackerUrl', '${matomoDomain}/piwik.php']);
        window._paq.push(['setSiteId', '${matomoSite}']);
        window._paq.push(['enableLinkTracking']);
        window._paq.push(['trackPageView']);
        window._paq.push(['enableHeartBeatTimer']);
        window.start = new Date();

        var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
        g.type='text/javascript'; g.defer=true; g.async=true;
        g.src='${matomoDomain}/piwik.js';
        s.parentNode.insertBefore(g,s);
      `

      const noJs = `<img
          src="${matomoDomain}/piwik.php?idsite=${matomoSite}&rec=1&url=${url + pathname}"
          style="border:0"
          alt="tracker"
        />`

      return setPostBodyComponents([
        <Fragment key={'gatsby-plugin-matomo'}>
          <script
            type="text/javascript"
            dangerouslySetInnerHTML={{ __html: js }}
          />
          <noscript
            key={'gatsby-plugin-matomo-noscript'}
            dangerouslySetInnerHTML={{ __html: noJs }}
          />
        </Fragment>,
      ])
    }
  }
  return null
}
