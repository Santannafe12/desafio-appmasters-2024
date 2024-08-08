'use client'

import { ElevenLabs } from 'elevenlabs'
import Header from '../layout/header'
import Voices from '../voices/voices'
import { useState } from 'react'
import Form from '../form/form'

export default function HomeContainer({
  voices,
}: {
  voices: ElevenLabs.Voice[]
}) {
  const [text, setText] = useState<string>('')

  return (
    <div className="mx-auto my-6 w-11/12 space-y-8 sm:w-7/12">
      <Header />
      <Form setText={setText} />
      <Voices voices={voices} text={text} />
    </div>
  )
}
