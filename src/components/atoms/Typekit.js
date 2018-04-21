import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'

const TypekitScript = ({ id }) => (
  <script>
    {`
        (function(d) {
            var config = {
                kitId: '${id}',
                scriptTimeout: 3000,
                async: true
            },
            h=d.documentElement,t=setTimeout(function(){h.className=h.className.replace(/\bwf-loading\b/g,"")+" wf-inactive";},config.scriptTimeout),tk=d.createElement("script"),f=false,s=d.getElementsByTagName("script")[0],a;h.className+=" wf-loading";tk.src='https://use.typekit.net/'+config.kitId+'.js';tk.async=true;tk.onload=tk.onreadystatechange=function(){a=this.readyState;if(f||a&&a!="complete"&&a!="loaded")return;f=true;clearTimeout(t);try{Typekit.load(config)}catch(e){}};s.parentNode.insertBefore(tk,s)
        })(document);
    `}
  </script>
)

const Typekit = props => <Helmet>{TypekitScript(props)}</Helmet>

export default Typekit

TypekitScript.propTypes = {
  id: PropTypes.string.isRequired,
}
