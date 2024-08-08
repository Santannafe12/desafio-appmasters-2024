'use client'

import { AudioLines, Pause, Play } from 'lucide-react'
import { Separator } from '../ui/separator'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import { useState } from 'react'
import { ElevenLabs } from 'elevenlabs'
import Loader from '../utils/loader'
import { createAudioStreamFromText } from '@/lib/text-to-speech-file'

export default function VoiceComponent({
  voice,
  text,
}: {
  voice: ElevenLabs.Voice
  text: string
}) {
  const [isPreviewPlaying, setIsPreviewPlaying] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null)

  const handlePausePreview = () => {
    if (audio) {
      audio.pause()
      setIsPreviewPlaying(false)
    }
  }

  const handlePreview = () => {
    const newAudio = new Audio(voice.preview_url)
    newAudio.volume = 0.2
    newAudio.play()
    setAudio(newAudio)
    setIsPreviewPlaying(true)

    newAudio.addEventListener('ended', () => setIsPreviewPlaying(false))
  }

  const handleGenerate = async () => {
    setIsGenerating(true)

    try {
      const stream = await createAudioStreamFromText(voice.voice_id, text)
      const uint8Array = new Uint8Array(stream)
      const audioBlob = new Blob([uint8Array], { type: 'audio/mpeg' })

      const formData = new FormData()
      formData.append('file', audioBlob, 'audio.mp3')

      const response = await fetch(
        'https://desafio-appmasters-2024.vercel.app/api/put-audio',
        {
          method: 'PUT',
          body: formData,
        },
      )

      const { url } = await response.json()

      const newAudio = new Audio(url)
      newAudio.volume = 0.2
      newAudio.play()
    } catch (error) {
      console.error('Erro gerando áudio:', error)
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="rounded-md border p-4">
      <div className="flex flex-col items-center justify-between gap-4 lg:flex-row lg:gap-2">
        <div className="flex flex-col items-center gap-4 lg:flex-row lg:gap-2">
          <div className="flex items-center gap-2">
            <AudioLines className="h-6 w-6" />
            <h1 className="line-clamp-1">{voice.name}</h1>
          </div>
          <Separator orientation="vertical" className="hidden h-6 lg:block" />
          <div className="flex items-center gap-2">
            <Badge>{voice.category}</Badge>
          </div>
        </div>
        <div className="flex items-center gap-4">
          {isPreviewPlaying ? (
            <Button
              onClick={handlePausePreview}
              size={'sm'}
              className="w-24 text-sm lg:text-base"
            >
              <Pause className="h-4 w-4 lg:h-6 lg:w-6" />
            </Button>
          ) : (
            <Button
              onClick={handlePreview}
              size={'sm'}
              className="w-24 text-xs lg:text-base"
              disabled={isGenerating}
            >
              Preview
            </Button>
          )}
          {text.length > 0 &&
            (isGenerating ? (
              <Loader />
            ) : (
              <Button
                size={'sm'}
                variant={'secondary'}
                className="w-24 gap-1 text-xs lg:text-base"
                disabled={isPreviewPlaying}
                onClick={handleGenerate}
              >
                <Play className="h-4 w-4 lg:h-6 lg:w-6" />
                Gerar
              </Button>
            ))}
        </div>
      </div>
      <Separator orientation="horizontal" className="my-4" />
      <div className="flex items-start gap-2">
        <Badge variant={'secondary'}>Tags:</Badge>
        {voice.labels ? (
          <ul className="flex flex-wrap items-center gap-2">
            {Object.entries(voice.labels).map(([key, value]) => (
              <Badge key={key} variant={'outline'}>
                {key}: {value}
              </Badge>
            ))}
          </ul>
        ) : (
          <p>Sem tags disponíveis.</p>
        )}
      </div>
    </div>
  )
}
