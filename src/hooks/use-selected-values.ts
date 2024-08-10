import { useReducer } from 'react'

type SelectedValuesState = { [key: string]: string }

export const useSelectedValues = () => {
  const [selectedValues, dispatch] = useReducer(
    (
      state: SelectedValuesState,
      action: { type: string; payload: { label: string; value: string } },
    ) => {
      switch (action.type) {
        case 'set_value':
          return { ...state, [action.payload.label]: action.payload.value }
        case 'clear_value': {
          const newState = { ...state }
          delete newState[action.payload.label]
          return newState
        }
        default:
          return state
      }
    },
    {},
  )

  return [selectedValues, dispatch] as const
}
