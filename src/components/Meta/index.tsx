import Head from 'next/head'
import meta from '../../../_content/meta.json'
import resume from '../../../_content/resume.json'

const Meta = ({
  title,
  description,
  image,
  slug
}: {
  title: string
  description?: string
  image?: string
  slug?: string
}) => {
  const twitterHandle = resume.basics.profiles.filter(
    ({ network }) => network === 'Twitter'
  )[0].username
  const url = slug ? `${meta.url}/${slug}` : meta.url

  return (
    <Head>
      <link rel="canonical" href={url} />

      {/* <!--  Essential META Tags --> */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:image" content={`${meta.url}/${image}`} />
      <meta property="og:url" content={url} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content={twitterHandle} />
    </Head>
  )
}

export default Meta
