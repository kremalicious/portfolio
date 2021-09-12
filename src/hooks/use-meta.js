import { useStaticQuery, graphql } from 'gatsby'

const query = graphql`
  query Meta {
    metaYaml {
      description
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
      matomoUrl
      matomoSite
      allowedHosts
      bugs
    }
  }
`

export const useMeta = () => {
  const { metaYaml } = useStaticQuery(query)
  return metaYaml
}
