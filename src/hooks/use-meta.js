import { useStaticQuery, graphql } from 'gatsby'

const query = graphql`
  query Meta {
    contentYaml {
      title
      tagline
      description
      url
      email
      social {
        Email
        Blog
        Twitter
        GitHub
        Dribbble
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
  const { contentYaml } = useStaticQuery(query)
  return contentYaml
}
