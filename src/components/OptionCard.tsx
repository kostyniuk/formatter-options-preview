import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { CodePreview } from './CodePreview'
import { useSelectedValues } from './SelectedValuesContext'
import { presets } from '@/data/presets'
import type { PrettierOption } from '@/data/prettierOptions'

interface OptionCardProps {
  option: PrettierOption
  selectedValue: string | boolean | number | Record<string, any>
  onValueChange: (value: string | boolean | number | Record<string, any>) => void
}

export function OptionCard({ option, selectedValue, onValueChange }: OptionCardProps): React.ReactNode {
  const { selectedPreset } = useSelectedValues()

  const isFromPreset = (() => {
    if (selectedPreset === 'default') {
      return false
    }

    const preset = presets.find(p => p.id === selectedPreset)
    if (!preset) {
      return false
    }

    const presetValue = preset.values[option.key]
    return presetValue !== undefined && presetValue !== option.defaultValue
  })()

  // Treat object values as "true" for display purposes
  const currentTabValue = typeof selectedValue === 'object' ? 'true' : String(selectedValue)

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-2">
          <div className="space-y-1">
            <CardTitle className="text-xl text-foreground">{option.name}</CardTitle>
            <code className="inline-block text-sm font-mono text-primary font-semibold bg-primary/10 px-2 py-0.5 rounded">
              {option.key}
            </code>
          </div>
        </div>
        <CardDescription className="text-sm leading-relaxed mt-2">
          {option.description}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
          <code className="rounded bg-muted px-2 py-1">
            CLI: {option.cliOverride}
          </code>
          <code className="rounded bg-muted px-2 py-1">
            API: {option.apiOverride}
          </code>
        </div>

        <Tabs
          value={currentTabValue}
          onValueChange={(value) => onValueChange(value === 'true' && typeof option.defaultValue === 'boolean' ? true : value === 'false' && typeof option.defaultValue === 'boolean' ? false : value)}
          className="w-full"
        >
          <TabsList className="w-full flex-wrap h-auto gap-1 bg-muted/50">
            {option.options.map((opt) => {
              const isDefault = opt.value === option.defaultValue
              const isSelected = String(opt.value) === currentTabValue

              return (
                <TabsTrigger
                  key={String(opt.value)}
                  value={String(opt.value)}
                  className={`text-xs transition-all ${isFromPreset && isSelected && !isDefault ? 'bg-amber-500! text-white! shadow-sm dark:bg-amber-600!' : ''}`}
                >
                  {String(opt.value) + (isDefault ? ' ⚙️' : '')}
                </TabsTrigger>
              )
            })}
          </TabsList>

          {option.options.map((opt) => (
            <TabsContent key={String(opt.value)} value={String(opt.value)}>
              {opt.description && (
                <p className="text-sm text-muted-foreground mb-3">
                  {opt.description}
                </p>
              )}
              <CodePreview
                code={opt.codeExample}
                language={option.language ?? 'typescript'}
              />
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  )
}
