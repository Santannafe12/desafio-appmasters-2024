import { ElevenLabsClient } from 'elevenlabs'

export async function GET() {
  try {
    const client = new ElevenLabsClient({
      apiKey: process.env.ELEVENLABS_API_KEY,
    })

    const voices = await client.voices.getAll()

    return new Response(JSON.stringify(voices.voices), {
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    return new Response('Houve um erro!', { status: 500 })
  }
}
