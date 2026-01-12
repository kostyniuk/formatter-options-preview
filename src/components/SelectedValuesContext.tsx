import { createContext, useContext, useState, ReactNode } from 'react'
import { prettierOptions } from '@/data/prettierOptions'
import { oxfmtOptions } from '@/data/oxfmtOptions'
import { presets } from '@/data/presets'

interface SelectedValuesContextType {
  selectedValues: Record<string, string | boolean | number | Record<string, any>>
  setSelectedValue: (key: string, value: string | boolean | number | Record<string, any>) => void
  resetSelectedValues: () => void
  selectedPreset: string
  setSelectedPreset: (presetId: string) => void
}

const SelectedValuesContext = createContext<SelectedValuesContextType | null>(null)

export function SelectedValuesProvider({ children }: { children: ReactNode }) {
  const [selectedValues, setSelectedValues] = useState<Record<string, string | boolean | number | Record<string, any>>>(() => {
    const initial: Record<string, string | boolean | number | Record<string, any>> = {}
    for (const option of prettierOptions) {
      initial[option.key] = option.defaultValue
    }
    for (const option of oxfmtOptions) {
      initial[option.key] = option.defaultValue
    }
    return initial
  })

  const [selectedPreset, setSelectedPresetState] = useState<string>('default')

  const setSelectedValue = (key: string, value: string | boolean | number | Record<string, any>) => {
    setSelectedValues((prev) => ({ ...prev, [key]: value }))
  }

  const resetSelectedValues = () => {
    const initial: Record<string, string | boolean | number | Record<string, any>> = {}
    for (const option of prettierOptions) {
      initial[option.key] = option.defaultValue
    }
    for (const option of oxfmtOptions) {
      initial[option.key] = option.defaultValue
    }
    setSelectedValues(initial)
    setSelectedPresetState('default')
  }

  const setSelectedPreset = (presetId: string) => {
    setSelectedPresetState(presetId)

    // Apply preset values
    const preset = presets.find(p => p.id === presetId)
    // Even if preset not found (shouldn't happen), reset to defaults? 
    // Let's reset to defaults first

    const nextValues: Record<string, string | boolean | number | Record<string, any>> = {}
    for (const option of prettierOptions) {
      nextValues[option.key] = option.defaultValue
    }
    for (const option of oxfmtOptions) {
      nextValues[option.key] = option.defaultValue
    }

    if (preset) {
      for (const [key, value] of Object.entries(preset.values)) {
        nextValues[key] = value
      }
    }

    setSelectedValues(nextValues)
  }

  return (
    <SelectedValuesContext.Provider value={{ selectedValues, setSelectedValue, resetSelectedValues, selectedPreset, setSelectedPreset }}>
      {children}
    </SelectedValuesContext.Provider>
  )
}

export function useSelectedValues() {
  const context = useContext(SelectedValuesContext)
  if (!context) {
    throw new Error('useSelectedValues must be used within a SelectedValuesProvider')
  }
  return context
}
