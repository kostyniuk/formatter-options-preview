import {
    Combobox,
    ComboboxInput,
    ComboboxContent,
    ComboboxList,
    ComboboxItem,
    ComboboxEmpty,
} from '@/components/ui/combobox'
import { presets } from '@/data/presets'

interface PresetSelectorProps {
    value: string
    onValueChange: (value: string) => void
}

export function PresetSelector({ value, onValueChange }: PresetSelectorProps) {

    return (
        <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-muted-foreground">Preset:</span>
            <Combobox value={value} onValueChange={(val) => val && onValueChange(val)} items={presets}>
                <ComboboxInput
                    placeholder="Select preset..."
                    className="w-[180px] h-8 bg-muted/50 border-0"
                    value={presets.find((p) => p.id === value)?.name}
                />
                <ComboboxContent>
                    <ComboboxEmpty>No presets found.</ComboboxEmpty>
                    <ComboboxList>
                        {presets.map((preset) => (
                            <ComboboxItem key={preset.id} value={preset.id}>
                                <div className="flex flex-col gap-0.5">
                                    <span className="font-medium">{preset.name}</span>
                                    <span className="text-xs text-muted-foreground mr-2">
                                        {preset.description}
                                    </span>
                                </div>
                            </ComboboxItem>
                        ))}
                    </ComboboxList>
                </ComboboxContent>
            </Combobox>
        </div>
    )
}
