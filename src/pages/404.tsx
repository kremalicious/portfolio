import Meta from '../components/Meta'
import NotFound from '../components/404'

const pageMeta = {
  title: `NotFound`
}

export default function NotFoundPage() {
  return (
    <>
      <Meta {...pageMeta} />
      <NotFound />
    </>
  )
}
