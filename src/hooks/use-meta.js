import { useStaticQuery, graphql } from 'gatsby'

const query = graphql`
  query Meta {
    metaYaml {
      title
      tagline
      description
      url
      img {
        childImageSharp {
          resize(width: 980) {
            src
          }
        }
      }
      availability {
        status
        available
        unavailable
      }
      gpg
      addressbook
      typekitID
      matomoUrl
      matomoSite
      allowedHosts
    }
  }
`

export const useMeta = () => {
  const { metaYaml } = useStaticQuery(query)
  return metaYaml
}
