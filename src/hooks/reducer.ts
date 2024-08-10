import { ElevenLabs } from 'elevenlabs'

export type SelectedLabels = {
  [key: string]: string[]
}

export type Action =
  | { type: 'collect_labels'; payload: ElevenLabs.Voice[] }
  | { type: 'other_action_type'; payload?: string }

export type LabelValues = {
  [label: string]: Set<string>
}

export const reducer = (state: LabelValues, action: Action): LabelValues => {
  switch (action.type) {
    case 'collect_labels':
      return action.payload.reduce((acc, voice) => {
        Object.entries(voice.labels ?? {}).forEach(([key, value]) => {
          if (!acc[key]) {
            acc[key] = new Set<string>()
          }
          acc[key].add(value)
        })
        return acc
      }, {} as LabelValues)
    default:
      return state
  }
}
