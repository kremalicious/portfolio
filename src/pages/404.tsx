import NotFound from '../components/404'
import Page from '../layouts/Page'

const pageMeta = {
  title: `Shenanigans`,
  description: 'Page not found.'
}

export default function NotFoundPage() {
  return (
    <Page {...pageMeta}>
      <NotFound />
    </Page>
  )
}
