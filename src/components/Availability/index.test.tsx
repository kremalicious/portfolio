import { render } from '@testing-library/react'
import Availability from '.'

describe('Availability', () => {
  it('renders correctly from data file values', () => {
    const { container } = render(<Availability />)
    expect(container.firstChild).toBeInTheDocument()
  })

  // it('renders correctly when status: true', () => {
  //   useStaticQuery.mockImplementationOnce(() => {
  //     return {
  //       metaYaml: {
  //         availability: {
  //           status: true,
  //           available: 'I am available.',
  //           unavailable: 'Not available.'
  //         }
  //       }
  //     }
  //   })

  //   const { container } = render(<Availability />)
  //   expect(container.firstChild).toBeInTheDocument()
  //   expect(container.firstChild).toHaveTextContent('I am available.')
  // })

  // it('renders correctly when status: false', () => {
  //   useStaticQuery.mockImplementationOnce(() => {
  //     return {
  //       metaYaml: {
  //         availability: {
  //           status: false,
  //           available: 'I am available.',
  //           unavailable: 'Not available.'
  //         }
  //       }
  //     }
  //   })

  //   const { container } = render(<Availability />)
  //   expect(container.firstChild).toBeInTheDocument()
  //   expect(container.firstChild).toHaveTextContent('Not available.')
  // })
})
