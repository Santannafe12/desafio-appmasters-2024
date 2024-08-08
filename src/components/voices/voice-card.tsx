'use client'

import { AudioLines, Ear, Headphones, Pause, Play } from 'lucide-react'
import { Separator } from '../_ui/separator'
import { Badge } from '../_ui/badge'
import { Button } from '../_ui/button'
import { useState, useRef } from 'react'
import { ElevenLabs } from 'elevenlabs'
import { createAudioStreamFromText } from '@/lib/create-audio-stream-text'
import { toast } from '../_ui/use-toast'
import { ToastAction } from '../_ui/toast'
import Loader from '../utils/loader'

export default function VoiceCard({
  voice,
  text,
}: {
  voice: ElevenLabs.Voice
  text: string
}) {
  const [isPreviewPlaying, setIsPreviewPlaying] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const [isGeneratedPlaying, setIsGeneratedPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const handlePausePreview = () => {
    if (audioRef.current) {
      audioRef.current.pause()
      setIsPreviewPlaying(false)
    }
  }

  const handlePreview = () => {
    if (isGenerating || isGeneratedPlaying) return

    const newAudio = new Audio(voice.preview_url)
    newAudio.volume = 0.2
    newAudio.play()
    audioRef.current = newAudio
    setIsPreviewPlaying(true)

    newAudio.addEventListener('ended', () => setIsPreviewPlaying(false))
  }

  const handleGenerate = async () => {
    if (isPreviewPlaying) {
      handlePausePreview()
    }

    setIsGenerating(true)

    try {
      const stream = await createAudioStreamFromText(voice.voice_id, text)
      const uint8Array = new Uint8Array(stream)
      const audioBlob = new Blob([uint8Array], { type: 'audio/mpeg' })

      const formData = new FormData()
      formData.append('file', audioBlob, 'audio.mp3')

      const response = await fetch('/api/put-audio', {
        method: 'PUT',
        body: formData,
      })

      const { url } = await response.json()

      const newAudio = new Audio(url)
      newAudio.volume = 0.2
      newAudio.play()
      setIsGeneratedPlaying(true)

      newAudio.addEventListener('ended', () => setIsGeneratedPlaying(false))
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Algo deu errado!',
        description:
          'Houve um erro ao gerar o áudio. Por favor, tente novamente.',
        action: (
          <ToastAction altText="Tentar novamente" onClick={handleGenerate}>
            Tentar novamente
          </ToastAction>
        ),
      })
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="rounded-md border p-4 transition-all hover:bg-muted/50">
      <div className="flex flex-col items-center justify-between gap-4 lg:flex-row lg:gap-2">
        <div className="flex flex-col items-center gap-4 lg:flex-row lg:gap-2">
          <div className="flex items-center gap-2">
            <AudioLines className="h-6 w-6" />
            <h1 className="line-clamp-1">{voice.name}</h1>
          </div>
          <Separator orientation="vertical" className="hidden h-6 lg:block" />
          <div className="flex items-center gap-2">
            <Badge>
              {voice.category === 'premade' ? 'pré-feito' : voice.category}
            </Badge>
          </div>
        </div>
        <div className="flex items-center gap-4">
          {isPreviewPlaying ? (
            <Button
              onClick={handlePausePreview}
              size={'sm'}
              className="w-32 text-sm lg:text-base"
            >
              <Pause className="h-4 w-4 lg:h-6 lg:w-6" />
            </Button>
          ) : (
            !isGeneratedPlaying && (
              <Button
                onClick={handlePreview}
                size={'sm'}
                className="w-32 gap-1 text-xs lg:text-base"
                disabled={isGenerating}
              >
                <Ear className="h-4 w-4 lg:h-6 lg:w-6" />
                Escutar
              </Button>
            )
          )}
          {text.length > 0 &&
            (isGenerating ? (
              <Loader />
            ) : isGeneratedPlaying ? (
              <Button
                className="gap-1 text-xs lg:text-base"
                variant={'secondary'}
              >
                <Headphones className="h-4 w-4 lg:h-6 lg:w-6" />
                Reproduzindo...
              </Button>
            ) : (
              <Button
                size={'sm'}
                variant={'secondary'}
                className="w-24 gap-1 text-xs lg:text-base"
                disabled={
                  isPreviewPlaying || isGenerating || isGeneratedPlaying
                }
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
        <Badge variant={'secondary'}>Labels:</Badge>
        {voice.labels ? (
          <ul className="flex flex-wrap items-center gap-2">
            {Object.entries(voice.labels).map(([key, value]) => (
              <Badge key={key} variant={'outline'}>
                {key}: {value}
              </Badge>
            ))}
          </ul>
        ) : (
          <p>Sem labels disponíveis.</p>
        )}
      </div>
    </div>
  )
}
