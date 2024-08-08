import HomePage from '@/components/home/home-page'
import Fallback from '@/components/utils/fallback'
import { Suspense } from 'react'

export default function Home() {
  return (
    <Suspense fallback={<Fallback />}>
      <HomePage />
    </Suspense>
  )
}
