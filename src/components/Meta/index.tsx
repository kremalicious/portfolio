import meta from '../../../_content/meta.json'
import resume from '../../../_content/resume.json'

const Meta = ({
  title,
  description,
  image,
  slug
}: {
  title: string
  description: string
  image?: string
  slug?: string
}) => {
  const url = slug ? `${meta.url}/${slug}` : meta.url

  return (
    <Head>
      <link rel="canonical" href={url} />

      {/* <!--  Essential META Tags --> */}
      <title>{title}</title>
      <meta name="description" content={`${description.slice(0, 200)}...`} />
      <meta property="og:title" content={title} />
      <meta property="og:image" content={`${meta.url}/${image}`} />
      <meta property="og:url" content={url} />
      <meta name="twitter:card" content="summary_large_image" />
    </Head>
  )
}

export default Meta
