import Meta from '../../components/Meta'

type Props = {
  children: React.ReactNode
  title: string
  description: string
  image?: string
  slug?: string
}

export default function Page({
  children,
  title,
  description,
  image,
  slug
}: Props) {
  return (
    <>
      <Meta title={title} description={description} image={image} slug={slug} />
      {children}
    </>
  )
}
