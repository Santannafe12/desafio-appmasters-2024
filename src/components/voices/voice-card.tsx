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
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../_ui/card'
import { SelectedLabels } from '@/hooks/reducer'

export default function VoiceCard({
  voice,
  text,
  selectedLabels,
}: {
  voice: ElevenLabs.Voice
  text: string
  selectedLabels: SelectedLabels
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
    <Card className="flex flex-col justify-between gap-4 rounded-md border p-4 transition-all hover:bg-muted/50 lg:gap-2">
      <div className="mb-2 flex flex-col items-center justify-between gap-4 lg:flex-row">
        <CardHeader className="flex flex-col gap-4 p-0 lg:flex-row lg:gap-2">
          <CardTitle className="flex items-center gap-2">
            <AudioLines className="h-6 w-6" />
            <span className="line-clamp-1">{voice.name}</span>
          </CardTitle>
          <Separator orientation="vertical" className="hidden h-6 lg:block" />
          <CardDescription className="flex justify-center">
            {voice.category === 'premade' ? 'pré-feito' : voice.category}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-4">
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
                className="w-full gap-1 text-xs lg:w-32 lg:text-base"
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
                className="w-full gap-1 text-xs lg:w-24 lg:text-base"
                disabled={
                  isPreviewPlaying || isGenerating || isGeneratedPlaying
                }
                onClick={handleGenerate}
              >
                <Play className="h-4 w-4 lg:h-6 lg:w-6" />
                Gerar
              </Button>
            ))}
        </CardContent>
      </div>
      <Separator orientation="horizontal" className="mb-4" />
      <CardFooter className="flex items-start gap-2 p-0 lg:items-center">
        <Badge variant={'secondary'}>Labels:</Badge>
        {voice.labels ? (
          <ul className="flex flex-wrap gap-2">
            {Object.entries(voice.labels).map(([key, value]) =>
              selectedLabels[key]?.includes(value) ? null : (
                <li key={`${key}-${value}`}>
                  <Badge variant={'outline'}>{value}</Badge>
                </li>
              ),
            )}
          </ul>
        ) : (
          <p>Sem labels disponíveis.</p>
        )}
      </CardFooter>
    </Card>
  )
}
