import NotFound from '@/components/404'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Shenanigans',
  description: 'Page not found.'
}

export default function NotFoundPage() {
  return <NotFound />
}
