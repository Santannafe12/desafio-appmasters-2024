import VoiceLayout from '@/components/voices/voice-layout'

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

export default async function Home() {
  const voices = await getVoices()

  return <VoiceLayout voices={voices} />
}
