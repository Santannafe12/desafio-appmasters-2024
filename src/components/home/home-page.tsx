import ErrorDisplay from '../utils/error-display'
import HomeContainer from './home-container'

async function getVoices() {
  const response = await fetch(
    process.env.NEXT_PUBLIC_BASE_URL + 'api/get-voices',
    {
      next: {
        revalidate: 60,
      },
    },
  )

  const voices = await response.json()

  return voices
}

export default async function HomePage() {
  const voices = await getVoices()

  if (!voices) {
    return <ErrorDisplay />
  }

  return <HomeContainer voices={voices} />
}
