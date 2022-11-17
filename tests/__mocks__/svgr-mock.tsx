import { SVGProps, forwardRef } from 'react'

const SvgrMock = forwardRef<SVGSVGElement, SVGProps<SVGSVGElement>>(
  (props, ref) => <svg ref={ref} {...props} />
)

SvgrMock.displayName = 'SvgrMock'

export const ReactComponent = SvgrMock
export default SvgrMock
