import NotFound from '../components/404'
import Page from '../layouts/Page'

const pageMeta = {
  title: `NotFound`
}

export default function NotFoundPage() {
  return (
    <Page {...pageMeta}>
      <NotFound />
    </Page>
  )
}
