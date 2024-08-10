'use client'

import { ElevenLabs } from 'elevenlabs'
import Header from '../layout/header'
import Voices from '../voices/voices'
import { useMemo, useState } from 'react'
import Form from '../form/form'
import Filters from '../utils/filters'
import { SelectedLabels } from '@/hooks/reducer'

export default function HomeContainer({
  voices,
}: {
  voices: ElevenLabs.Voice[]
}) {
  const [text, setText] = useState<string>('')
  const [selectedLabels, setSelectedLabels] = useState<SelectedLabels>({})

  const filteredVoices = useMemo(() => {
    return voices.filter((voice) => {
      return Object.entries(selectedLabels).every(([key, values]) => {
        return values.length === 0 || values.includes(voice.labels![key])
      })
    })
  }, [voices, selectedLabels])

  return (
    <div className="mx-auto my-6 w-11/12 space-y-8 sm:w-7/12">
      <Header />
      <Form setText={setText} />
      <Filters voices={voices} setSelectedLabels={setSelectedLabels} />
      <Voices
        voices={filteredVoices}
        text={text}
        selectedLabels={selectedLabels}
      />
    </div>
  )
}
