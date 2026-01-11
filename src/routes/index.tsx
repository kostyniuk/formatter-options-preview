import { createFileRoute, useSearch } from '@tanstack/react-router'
import { OptionCard } from '@/components/OptionCard'
import { Separator } from '@/components/ui/separator'
import { prettierOptions } from '@/data/prettierOptions'
import { oxfmtOptions } from '@/data/oxfmtOptions'

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
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              <span className="text-primary">Prettier</span> Options Configurator
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore all Prettier formatting options. Preview and export
              configuration files for your projects.
            </p>
          </div>

          {showPrettierSection && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredPrettierOptions.map((option) => (
                <OptionCard key={option.key} option={option} />
              ))}
            </div>
          )}

          {showOxfmtSection && filteredOxfmtOptions.length > 0 && (
            <>
              <Separator className="my-16" />

              <div className="text-center mb-10">
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
                  <span className="text-[#F9D949]">Oxfmt</span> Options Configurator
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  These options are exclusive to{' '}
                  <a
                    href="https://oxc.rs/docs/guide/usage/formatter/config-file-reference.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#F9D949] hover:underline"
                  >
                    Oxfmt
                  </a>
                  , the Rust-based JavaScript formatter from the Oxc project.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredOxfmtOptions.map((option) => (
                  <OptionCard key={option.key} option={option} />
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
