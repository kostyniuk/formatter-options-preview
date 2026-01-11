import { createContext, useContext, useState, ReactNode } from 'react'
import { prettierOptions } from '@/data/prettierOptions'
import { oxfmtOptions } from '@/data/oxfmtOptions'

interface SelectedValuesContextType {
  selectedValues: Record<string, string | boolean | number>
  setSelectedValue: (key: string, value: string | boolean | number) => void
  resetSelectedValues: () => void
}

const SelectedValuesContext = createContext<SelectedValuesContextType | null>(null)

export function SelectedValuesProvider({ children }: { children: ReactNode }) {
  const [selectedValues, setSelectedValues] = useState<Record<string, string | boolean | number>>(() => {
    const initial: Record<string, string | boolean | number> = {}
    for (const option of prettierOptions) {
      initial[option.key] = option.defaultValue
    }
    for (const option of oxfmtOptions) {
      initial[option.key] = option.defaultValue
    }
    return initial
  })

  const setSelectedValue = (key: string, value: string | boolean | number) => {
    setSelectedValues((prev) => ({ ...prev, [key]: value }))
  }

  const resetSelectedValues = () => {
    const initial: Record<string, string | boolean | number> = {}
    for (const option of prettierOptions) {
      initial[option.key] = option.defaultValue
    }
    for (const option of oxfmtOptions) {
      initial[option.key] = option.defaultValue
    }
    setSelectedValues(initial)
  }

  return (
    <SelectedValuesContext.Provider value={{ selectedValues, setSelectedValue, resetSelectedValues }}>
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
