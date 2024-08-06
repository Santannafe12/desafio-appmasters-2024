import { Label } from '../ui/label'
import VoiceComponent from './voice-component'

// CASO ALGUM AUDIO ESTEJA SENDO GERADO, NÃO SERA POSSIVEL EXECUTAR NENHUMA OUTRA ACAO

export default function VoicesList() {
  return (
    <div className="space-y-4">
      <Label className="text-xl">Lista de vozes disponíveis:</Label>
      <VoiceComponent />
      <VoiceComponent />
      <VoiceComponent />
      <VoiceComponent />
      <VoiceComponent />
      <VoiceComponent />
      <VoiceComponent />
      <VoiceComponent />
      <VoiceComponent />
    </div>
  )
}
