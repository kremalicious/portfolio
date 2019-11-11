import { useStaticQuery, graphql } from 'gatsby'

const query = graphql`
  query Meta {
    metaYaml {
      title
      tagline
      description
      url
      email
      img {
        childImageSharp {
          resize(width: 980) {
            src
          }
        }
      }
      avatar {
        childImageSharp {
          resize {
            src
          }
        }
      }
      social {
        Email
        Blog
        Twitter
        GitHub
        Dribbble
        Keybase
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
