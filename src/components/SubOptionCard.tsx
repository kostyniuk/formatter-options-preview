import { useState } from 'react'
import { TabsContent } from '@/components/ui/tabs'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { OptionTabs } from './OptionTabs'
import { OptionCardLayout } from './OptionCardLayout'

import { CodePreview } from './CodePreview'
import { useSelectedValues } from './SelectedValuesContext'
import { presets } from '@/data/presets'
import { Checkbox } from '@/components/ui/checkbox'
import { formatCode } from '@/lib/formatCode'
import type { PrettierOption } from '@/data/prettierOptions'

interface SubOptionCardProps {
    option: PrettierOption
    selectedValue: string | boolean | number | Record<string, any>
    onValueChange: (value: string | boolean | number | Record<string, any>) => void
}

export function SubOptionCard({ option, selectedValue, onValueChange }: SubOptionCardProps) {
    const { selectedPreset } = useSelectedValues()
    const [formattedCode, setFormattedCode] = useState<string | null>(null)
    const [isFormatting, setIsFormatting] = useState(false)

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

    const currentSubValues: Record<string, any> = typeof selectedValue === 'object' && selectedValue !== null
        ? selectedValue
        : {}

    // Format code immediately when options change
    const updateFormattedCode = (config: any) => {
        if (!option.inputCode) return

        if (config === false) {
            setFormattedCode(null)
            return
        }

        const sortImportsConfig = typeof config === 'object' && config !== null ? config : {}

        if (Object.keys(sortImportsConfig).length === 0) {
            setFormattedCode(option.inputCode)
            return
        }

        setIsFormatting(true)
        formatCode({
            data: {
                code: option.inputCode,
                experimentalSortImports: sortImportsConfig,
            },
        })
            .then((result: { code: string; error: string | null }) => {
                setFormattedCode(result.code)
            })
            .catch(() => {
                setFormattedCode(option.inputCode ?? null)
            })
            .finally(() => {
                setIsFormatting(false)
            })
    }

    // Keep preview in sync with external changes (like presets) or initial load


    const handleSubOptionChange = (subKey: string, value: string | boolean, isCheckbox: boolean = true) => {
        const currentObj = typeof selectedValue === 'object' && selectedValue !== null ? { ...selectedValue } : {}
        let newValue: any

        if (isCheckbox && value === false) {
            newValue = { ...currentObj, [subKey]: false }
        } else if (value === '') {
            const { [subKey]: _removed, ...rest } = currentObj
            newValue = Object.keys(rest).length > 0 ? rest : {}
        } else {
            newValue = { ...currentObj, [subKey]: value }
        }

        onValueChange(newValue)
        updateFormattedCode(newValue)
    }

    const currentTabValue = (typeof selectedValue === 'object' || selectedValue === true) ? 'true' : 'false'

    return (
        <OptionCardLayout option={option}>

            <OptionTabs
                value={currentTabValue}
                onValueChange={(value) => {
                    if (value === 'false') {
                        onValueChange(false)
                        updateFormattedCode(false)
                    } else if (value === 'true') {
                        const defaultObj: Record<string, any> = {}
                        for (const subOpt of option.subOptions!) {
                            defaultObj[subOpt.key] = subOpt.defaultValue
                        }
                        onValueChange(defaultObj)
                        updateFormattedCode(defaultObj)
                    }
                }}
                options={option.options.map(opt => ({
                    value: opt.value === false ? 'false' : 'true',
                    label: opt.label,
                    isDefault: opt.value === option.defaultValue
                }))}
                resultFromPreset={isFromPreset}
            >

                <TabsContent value="false">
                    {option.options.find(o => o.value === false)?.description && (
                        <p className="text-sm text-muted-foreground mb-3">
                            {option.options.find(o => o.value === false)?.description}
                        </p>
                    )}
                    <CodePreview
                        code={option.options.find(o => o.value === false)?.codeExample ?? ''}
                        language={option.language ?? 'typescript'}
                    />
                </TabsContent>

                <TabsContent value="true">
                    {option.options.find(o => o.value !== false)?.description && (
                        <p className="text-sm text-muted-foreground mb-3">
                            {option.options.find(o => o.value !== false)?.description}
                        </p>
                    )}

                    <div className="mb-4 p-3 rounded-lg bg-muted/30 border border-border space-y-3">
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Configure Options</p>
                        {option.subOptions!.map((subOpt) => {
                            const currentValue = currentSubValues[subOpt.key]
                            const isSubEnabled = subOpt.type === 'select'
                                ? currentValue !== undefined && currentValue !== false
                                : currentValue === true

                            if (subOpt.type === 'select') {
                                return (
                                    <div key={subOpt.key} className="flex items-center gap-3">
                                        <Checkbox
                                            checked={isSubEnabled}
                                            id={subOpt.key}
                                            onCheckedChange={(checked: boolean) => {
                                                if (checked) {
                                                    handleSubOptionChange(subOpt.key, subOpt.defaultValue as string, false)
                                                } else {
                                                    handleSubOptionChange(subOpt.key, '', false)
                                                }
                                            }}
                                        />
                                        <label className="text-sm flex-1 cursor-pointer select-none" htmlFor={subOpt.key}>
                                            {subOpt.label}
                                        </label>
                                        <div className="h-8">
                                            {isSubEnabled && subOpt.choices && (
                                                <Select
                                                    value={String(currentValue ?? subOpt.defaultValue)}
                                                    onValueChange={(value: string) => handleSubOptionChange(subOpt.key, value, false)}
                                                >
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select a fruit" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectGroup>
                                                            {subOpt.choices.map((choice) => (
                                                                <SelectItem key={choice} value={choice} className="text-xs">
                                                                    {choice}
                                                                </SelectItem>
                                                            ))}
                                                        </SelectGroup>
                                                    </SelectContent>
                                                </Select>

                                            )}
                                        </div>
                                    </div>
                                )
                            }

                            return (
                                <div key={subOpt.key} className="flex items-center gap-3">
                                    <Checkbox
                                        id={subOpt.key}
                                        checked={isSubEnabled}
                                        onCheckedChange={(checked: boolean) => {
                                            handleSubOptionChange(subOpt.key, checked, true)
                                        }}
                                    />
                                    <label className="text-sm flex-1 cursor-pointer select-none" htmlFor={subOpt.key}>
                                        {subOpt.label}
                                    </label>
                                </div>
                            )
                        })}
                    </div>

                    <div className="relative">
                        {isFormatting && (
                            <div className="absolute inset-0 bg-slate-900/30 rounded-lg z-10 flex items-center justify-center backdrop-blur-[1px]">
                                <div className="text-xs text-muted-foreground bg-slate-800/90 px-2 py-1 rounded">
                                    Formatting...
                                </div>
                            </div>
                        )}
                        <CodePreview
                            code={formattedCode ?? option.inputCode ?? option.options.find(o => o.value !== false)?.codeExample ?? ''}
                            language={option.language ?? 'typescript'}
                        />
                    </div>
                </TabsContent>
            </OptionTabs>
        </OptionCardLayout>
    )
}
