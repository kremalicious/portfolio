import { useStaticQuery, graphql } from 'gatsby'

const query = graphql`
  query Resume {
    contentJson {
      basics {
        name
        label
        picture {
          childImageSharp {
            fixed(width: 256, height: 256) {
              ...GatsbyImageSharpFixed_withWebp_noBase64
            }
          }
        }
        email
        website
        summary
        profiles {
          network
          url
          username
        }
        location {
          city
          country
          countryCode
        }
      }
      education {
        institution
        area
        studyType
        startDate
        endDate
      }
      languages {
        language
        fluency
      }
      skills {
        name
        level
        keywords
      }
      work {
        company
        position
        website
        startDate
        endDate
        summary
        highlights
      }
    }
  }
`

export const useResume = () => {
  const { contentJson } = useStaticQuery(query)
  return contentJson
}
