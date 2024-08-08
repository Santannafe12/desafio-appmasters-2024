import VoiceLayout from '@/components/voices/voice-layout'

async function getVoices() {
  const response = await fetch(
    'https://desafio-appmasters-2024.vercel.app/api/get-voices',
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
