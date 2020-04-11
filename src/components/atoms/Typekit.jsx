import React, { memo } from 'react'
import { Helmet } from 'react-helmet'
import { useMeta } from '../../hooks/use-meta'

const TypekitScript = (typekitID) => (
  <script>
    {`
        (function(d) {
            var config = {
                kitId: '${typekitID}',
                scriptTimeout: 3000,
                async: true
            },
            h=d.documentElement,t=setTimeout(function(){h.className=h.className.replace(/\bwf-loading\b/g,"")+" wf-inactive";},config.scriptTimeout),tk=d.createElement("script"),f=false,s=d.getElementsByTagName("script")[0],a;h.className+=" wf-loading";tk.src='https://use.typekit.net/'+config.kitId+'.js';tk.async=true;tk.onload=tk.onreadystatechange=function(){a=this.readyState;if(f||a&&a!="complete"&&a!="loaded")return;f=true;clearTimeout(t);try{Typekit.load(config)}catch(e){}};s.parentNode.insertBefore(tk,s)
        })(document);
    `}
  </script>
)

const Typekit = () => {
  const { typekitID } = useMeta()

  return (
    <Helmet>
      <link rel="preconnect" href="https://typekit.com" />
      <link rel="preconnect" href="https://use.typekit.net" />
      <link rel="preconnect" href="https://p.typekit.net" />

      {TypekitScript(typekitID)}
    </Helmet>
  )
}

export default memo(Typekit)
