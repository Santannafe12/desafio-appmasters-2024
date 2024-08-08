'use client'

import { ElevenLabs } from 'elevenlabs'
import Header from '../layout/header'
import TextForm from './text-form'
import VoicesList from './voices-list'
import { useState } from 'react'

export default function VoiceLayout({
  voices,
}: {
  voices: ElevenLabs.Voice[]
}) {
  const [text, setText] = useState<string>('')

  return (
    <div className="mx-auto my-6 w-11/12 space-y-8 sm:w-7/12">
      <Header />
      <TextForm setText={setText} />
      <VoicesList voices={voices} text={text} />
    </div>
  )
}
