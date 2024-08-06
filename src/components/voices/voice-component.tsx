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
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <AudioLines className="h-6 w-6" />
          <h1>Voz Genérica</h1>
          <Separator orientation="vertical" className="h-6" />
          <Badge>Americano</Badge>
          <Badge>Grave</Badge>
          <Badge>Homem</Badge>
          {/* maximo de 3 categorias (badges) */}
        </div>
        <div className="flex items-center gap-4">
          {isPreviewPlaying ? (
            <Button onClick={() => setIsPreviewPlaying(false)} className="w-24">
              <Pause className="h-6 w-6" />
            </Button>
          ) : (
            <Button onClick={() => setIsPreviewPlaying(true)} className="w-24">
              Preview
            </Button>
          )}
          {isGenerating ? (
            <Loader />
          ) : (
            <Button
              variant={'secondary'}
              className="w-24 gap-1"
              disabled={isGenerating}
              onClick={() => setIsGenerating(true)}
            >
              <Play className="h-6 w-6" />
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
