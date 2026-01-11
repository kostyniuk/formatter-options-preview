import { createFileRoute, useSearch } from '@tanstack/react-router'
import { RotateCcw } from 'lucide-react'
import { OptionCard } from '@/components/OptionCard'

import { prettierOptions } from '@/data/prettierOptions'
import { oxfmtOptions } from '@/data/oxfmtOptions'
import { useSelectedValues } from '@/components/SelectedValuesContext'
import { Button } from '@/components/ui/button'

export const Route = createFileRoute('/')({
  validateSearch: (search: Record<string, unknown>) => {
    return {
      option: (search.option as string) || undefined,
    }
  },
  component: App,
})

function App() {
  const search = useSearch({ from: '/' })
  const selectedOption = search.option
  const { selectedValues, setSelectedValue, resetSelectedValues } = useSelectedValues()

  const filteredPrettierOptions = selectedOption
    ? prettierOptions.filter((option) => option.key === selectedOption)
    : prettierOptions

  const filteredOxfmtOptions = selectedOption
    ? oxfmtOptions.filter((option) => option.key === selectedOption)
    : oxfmtOptions

  const showPrettierSection = !selectedOption || filteredPrettierOptions.length > 0
  const showOxfmtSection = !selectedOption || filteredOxfmtOptions.length > 0

  return (
    <div className="min-h-screen">
      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-10">
            <div className="text-center flex-1">
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-foreground drop-shadow-sm leading-[1.1]">
                Mellowfmt
              </h1>
              <p className="text-xl md:text-2xl lg:text-3xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Configure and compare options for <span className="font-semibold text-primary">Prettier</span> and <span className="font-semibold text-[#F9D949]">Oxfmt</span>.
                Preview real-time changes and export your configuration.
              </p>
            </div>
            <Button variant="outline" size="sm" onClick={resetSelectedValues}>
              <RotateCcw className="h-4 w-4 mr-2" />
              Reset All
            </Button>
          </div>

          {showPrettierSection && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredPrettierOptions.map((option) => (
                <OptionCard
                  key={option.key}
                  option={option}
                  selectedValue={selectedValues[option.key]}
                  onValueChange={(value) => setSelectedValue(option.key, value)}
                />
              ))}
            </div>
          )}

          {showOxfmtSection && filteredOxfmtOptions.length > 0 && (
            <>
              <div className="my-16" />

              <div className="flex items-center justify-between mb-10">
                <div className="text-center flex-1">
                  <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-foreground drop-shadow-sm leading-[1.1]">
                    <span className="text-[#F9D949]">Oxfmt</span> Options
                  </h2>
                  <p className="text-xl md:text-2xl lg:text-3xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                    These options are exclusive to{' '}
                    <a
                      href="https://oxc.rs/docs/guide/usage/formatter/config-file-reference.html"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#F9D949] hover:underline"
                    >
                      Oxfmt
                    </a>
                    , a blazingly fast Rust-based JavaScript formatter.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredOxfmtOptions.map((option) => (
                  <OptionCard
                    key={option.key}
                    option={option}
                    selectedValue={selectedValues[option.key]}
                    onValueChange={(value) => setSelectedValue(option.key, value)}
                  />
                ))}
              </div>
            </>
          )}

          {filteredPrettierOptions.length === 0 && filteredOxfmtOptions.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No options found.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
