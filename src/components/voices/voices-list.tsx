import { ElevenLabs } from 'elevenlabs'
import { Label } from '../ui/label'
import VoiceComponent from './voice-component'

// CASO ALGUM AUDIO ESTEJA SENDO GERADO, NÃO SERA POSSIVEL EXECUTAR NENHUMA OUTRA ACAO

export default function VoicesList({
  voices,
  text,
}: {
  voices: ElevenLabs.Voice[]
  text: string
}) {
  return (
    <div className="space-y-4">
      <Label className="text-base lg:text-xl">
        Lista de vozes disponíveis:
      </Label>
      {voices.map((voice, index) => (
        <div key={index}>
          <VoiceComponent voice={voice} text={text} />
        </div>
      ))}
    </div>
  )
}
