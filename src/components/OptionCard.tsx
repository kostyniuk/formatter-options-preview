import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { CodePreview } from './CodePreview'
import type { PrettierOption } from '@/data/prettierOptions'

interface OptionCardProps {
  option: PrettierOption
}

export function OptionCard({ option }: OptionCardProps) {
  const defaultOptionIndex = option.options.findIndex(
    (opt) => opt.value === option.defaultValue
  )
  const defaultOption = option.options[defaultOptionIndex] ?? option.options[0]


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

        <Tabs defaultValue={String(defaultOption.value)} className="w-full">
          <TabsList className="w-full flex-wrap h-auto gap-1 bg-muted/50">
            {option.options.map((opt) => {
              const isDefault = opt.value === option.defaultValue
              return (
                <TabsTrigger
                  key={String(opt.value)}
                  value={String(opt.value)}
                  className="text-xs"
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
