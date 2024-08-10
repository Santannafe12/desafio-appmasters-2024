import { ElevenLabs } from 'elevenlabs'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '../_ui/select'
import { Label } from '../_ui/label'
import { X } from 'lucide-react'
import { useSelectedValues } from '@/hooks/use-selected-values'
import { useLabelValues } from '@/hooks/use-label-values'

type SelectedLabels = {
  [key: string]: string[]
}

const VoiceSelects = ({
  voices,
  setSelectedLabels,
}: {
  voices: ElevenLabs.Voice[]
  setSelectedLabels: React.Dispatch<React.SetStateAction<SelectedLabels>>
}) => {
  const [selectedValues, setSelectedValues] = useSelectedValues() // hook Controle do select
  const labelValues = useLabelValues(voices) // hook Labels disponíveis

  const handleSelectChange = (label: string, value: string) => {
    // Função para alterar o valor do select
    setSelectedLabels((prev) => ({
      ...prev,
      [label]: value ? [value] : [],
    }))
    setSelectedValues({ type: 'set_value', payload: { label, value } })
  }

  const handleClearSelect = (label: string) => {
    // Função para limpar o valor do select
    setSelectedLabels((prev) => ({
      ...prev,
      [label]: [],
    }))
    setSelectedValues({ type: 'clear_value', payload: { label, value: '' } })
  }

  return (
    <div className="space-y-2">
      <div className="space-y-2">
        <Label className="text-base lg:text-xl">Filtre por categorias:</Label>
      </div>
      <div className="flex flex-col items-center gap-4 lg:flex-row">
        {Object.keys(labelValues).map((label) => (
          <Select
            key={label}
            value={selectedValues[label] || ''}
            onValueChange={(value) => handleSelectChange(label, value)}
          >
            <SelectTrigger>
              <SelectValue placeholder={label} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {selectedValues[label] && (
                  <SelectLabel
                    className="flex cursor-pointer items-center gap-2"
                    onClick={() => handleClearSelect(label)}
                  >
                    Limpar filtro
                    <X className="h-4 w-4" />
                  </SelectLabel>
                )}
                {[...Array.from(labelValues[label])].map((value) => (
                  <SelectItem key={value} value={value}>
                    {value}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        ))}
      </div>
    </div>
  )
}

export default VoiceSelects
