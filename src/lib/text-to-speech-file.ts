'use server'

import { ElevenLabsClient } from 'elevenlabs'

import * as dotenv from 'dotenv'

dotenv.config()

const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY

const client = new ElevenLabsClient({
  apiKey: ELEVENLABS_API_KEY,
})

export const createAudioStreamFromText = async (
  voice: string,
  text: string,
): Promise<Buffer> => {
  const audioStream = await client.generate({
    voice,
    model_id: 'eleven_multilingual_v2',
    text,
  })

  const chunks: Buffer[] = []
  for await (const chunk of audioStream) {
    chunks.push(chunk)
  }

  const content = Buffer.concat(chunks)
  return content
}
