'use client'

import { AudioLines, Pause, Play } from 'lucide-react'
import { Separator } from '../ui/separator'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import { useState } from 'react'
import Loader from '../utils/loader'

export default function VoiceComponent() {
  const [isPreviewPlaying, setIsPreviewPlaying] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)

  return (
    <div className="rounded-md border p-4">
      <div className="flex flex-col items-center justify-between gap-4 lg:flex-row lg:gap-2">
        <div className="flex flex-col items-center gap-4 lg:flex-row lg:gap-2">
          <div className="flex items-center gap-2">
            <AudioLines className="h-6 w-6" />
            <h1 className="line-clamp-1">Voz Genérica</h1>
          </div>
          <Separator orientation="vertical" className="hidden h-6 lg:block" />
          <div className="flex items-center gap-2">
            <Badge>Americano</Badge>
            <Badge>Grave</Badge>
            <Badge>Homem</Badge>
            {/* maximo de 3 categorias (badges) */}
          </div>
        </div>
        <div className="flex items-center gap-4">
          {isPreviewPlaying ? (
            <Button
              onClick={() => setIsPreviewPlaying(false)}
              size={'sm'}
              className="w-24 text-sm lg:text-base"
            >
              <Pause className="h-4 w-4 lg:h-6 lg:w-6" />
            </Button>
          ) : (
            <Button
              onClick={() => setIsPreviewPlaying(true)}
              size={'sm'}
              className="w-24 text-xs lg:text-base"
            >
              Preview
            </Button>
          )}
          {isGenerating ? (
            <Loader />
          ) : (
            <Button
              size={'sm'}
              variant={'secondary'}
              className="w-24 gap-1 text-xs lg:text-base"
              disabled={isGenerating}
              onClick={() => setIsGenerating(true)}
            >
              <Play className="h-4 w-4 lg:h-6 lg:w-6" />
              Gerar
            </Button>
          )}
        </div>
      </div>
      <Separator orientation="horizontal" className="my-4" />
      <div className="flex flex-wrap items-center gap-2">
        <Badge variant={'secondary'}>Tags:</Badge>
        <Badge variant={'outline'}>
          Serialized labels dictionary for the voice.
        </Badge>
        <Badge variant={'outline'}>
          Serialized labels dictionary for the voice.
        </Badge>
      </div>
    </div>
  )
}
