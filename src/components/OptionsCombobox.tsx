import {
  Combobox,
  ComboboxInput,
  ComboboxContent,
  ComboboxList,
  ComboboxItem,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxLabel,
  ComboboxCollection,
} from '@/components/ui/combobox'
import { cn } from '@/lib/utils'
import type { PrettierOption } from '@/data/prettierOptions'
import { prettierOptions } from '@/data/prettierOptions'
import { oxfmtOptions } from '@/data/oxfmtOptions'

interface OptionsComboboxProps {
  options: PrettierOption[]
  value: string
  onValueChange?: (value: string) => void
}

export function OptionsCombobox({
  options,
  value,
  onValueChange,
}: OptionsComboboxProps) {
  const prettierKeys = new Set(prettierOptions.map((opt) => opt.key))
  const oxfmtKeys = new Set(oxfmtOptions.map((opt) => opt.key))

  const prettierItems = options
    .filter((opt) => prettierKeys.has(opt.key))
    .map((opt) => ({
      value: opt.key,
      label: opt.name,
      key: opt.key,
    }))

  const oxfmtItems = options
    .filter((opt) => oxfmtKeys.has(opt.key))
    .map((opt) => ({
      value: opt.key,
      label: opt.name,
      key: opt.key,
    }))

  const groups = [
    {
      value: 'Prettier',
      items: prettierItems,
    },
    {
      value: 'Oxfmt',
      items: oxfmtItems,
    },
  ].filter((group) => group.items.length > 0)

  return (
    <Combobox
      value={value}
      onValueChange={(val) => onValueChange?.(val ?? '')}
      items={groups}
    >
      <ComboboxInput
        placeholder="Search formatting options..."
        className="w-full"
        showClear={!!value}
      />
      <ComboboxContent>
        <ComboboxEmpty>No options found.</ComboboxEmpty>
        <ComboboxList>
          {(group) => (
            <ComboboxGroup key={group.value} items={group.items}>
              <ComboboxLabel className={cn(
                "font-bold uppercase tracking-wider text-[10px]",
                group.value === 'Prettier' ? "text-primary" : "text-[#F9D949]"
              )}>
                {group.value}
              </ComboboxLabel>
              <ComboboxCollection>
                {(item) => (
                  <ComboboxItem key={item.value} value={item.value}>
                    <div className="flex flex-col gap-0.5">
                      <span className="font-medium">{item.label}</span>
                      <span className="text-xs text-muted-foreground font-mono">
                        {item.key}
                      </span>
                    </div>
                  </ComboboxItem>
                )}
              </ComboboxCollection>
            </ComboboxGroup>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  )
}
