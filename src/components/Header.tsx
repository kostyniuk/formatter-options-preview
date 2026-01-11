import { Link, useSearch, useNavigate } from '@tanstack/react-router'
import { ThemeToggle } from './ThemeToggle'
import { GenerateConfigDropdown } from './GenerateConfigDropdown'
import { OptionsCombobox } from './OptionsCombobox'
import { GitHubIcon, TwitterIcon } from './icons'
import { prettierOptions } from '@/data/prettierOptions'
import { oxfmtOptions } from '@/data/oxfmtOptions'

export default function Header() {
  const search = useSearch({ from: '/' })
  const navigate = useNavigate({ from: '/' })

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto px-6 h-14 flex items-center gap-4">
        <Link to="/" search={{ option: search.option }} className="flex items-center gap-2">
          <img src="/favicon.svg" alt="Logo" className="w-6 h-6" />
          <span className="text-lg font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
            Mellowfmt
          </span>
        </Link>
        <div className="flex-1" />
        <div className="w-64 hidden md:block">
          <OptionsCombobox
            options={[...prettierOptions, ...oxfmtOptions]}
            value={search.option || ''}
            onValueChange={(val) => navigate({ search: { option: val } })}
          />
        </div>
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/kostyniuk"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label="GitHub"
          >
            <GitHubIcon className="w-4 h-4" />
          </a>
          <a
            href="https://x.com/costiniuc00"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label="X"
          >
            <TwitterIcon className="w-4 h-4" />
          </a>
          <a
            href="https://prettier.io/docs/options"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors hidden sm:inline"
          >
            Prettier Docs
          </a>
          <a
            href="https://oxc.rs/docs/guide/usage/formatter/config-file-reference.html"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors hidden sm:inline"
          >
            Oxfmt Docs
          </a>
          <GenerateConfigDropdown />
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
