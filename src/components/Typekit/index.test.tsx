import { render } from '@testing-library/react'
import Typekit from '.'

describe('Typekit', () => {
  it('renders without crashing', async () => {
    render(<Typekit />)
  })
})
