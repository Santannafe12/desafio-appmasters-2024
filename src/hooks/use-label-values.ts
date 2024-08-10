import { useReducer, useEffect } from 'react'
import { ElevenLabs } from 'elevenlabs'
import { LabelValues, reducer } from '@/hooks/reducer'

export const useLabelValues = (voices: ElevenLabs.Voice[]) => {
  const [labelValues, dispatch] = useReducer(reducer, {} as LabelValues)

  useEffect(() => {
    dispatch({ type: 'collect_labels', payload: voices })
  }, [voices])

  return labelValues
}
