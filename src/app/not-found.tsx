import { Metadata } from 'next'
import NotFound from '@/components/404'

export const metadata: Metadata = {
  title: `Shenanigans`,
  description: 'Page not found.'
}

export default function NotFoundPage() {
  return <NotFound />
}
