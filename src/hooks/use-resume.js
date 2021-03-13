import { useStaticQuery, graphql } from 'gatsby'

const query = graphql`
  query Resume {
    contentJson {
      basics {
        name
        label
        picture {
          childImageSharp {
            gatsbyImageData(
              width: 256
              height: 256
              placeholder: NONE
              layout: FIXED
            )
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
      }
      awards {
        title
        date
        awarder
        summary
      }
    }
  }
`

export const useResume = () => {
  const { contentJson } = useStaticQuery(query)
  return contentJson
}
