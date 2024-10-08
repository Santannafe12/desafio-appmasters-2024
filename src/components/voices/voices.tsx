import { ElevenLabs } from 'elevenlabs'
import { Label } from '../_ui/label'
import VoiceCard from './voice-card'
import { SelectedLabels } from '@/hooks/reducer'

export default function Voices({
  voices,
  text,
  selectedLabels,
}: {
  voices: ElevenLabs.Voice[]
  text: string
  selectedLabels: SelectedLabels
}) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label className="text-base lg:text-xl">
          Lista de vozes disponíveis:
        </Label>
        <Label className="block text-muted-foreground">
          Caso queira ouvir um preview da voz, clique em &quot;Escutar&quot;.
        </Label>
      </div>
      {voices.map((voice, index) => (
        <div key={index}>
          <VoiceCard
            voice={voice}
            text={text}
            selectedLabels={selectedLabels}
          />
        </div>
      ))}
    </div>
  )
}
