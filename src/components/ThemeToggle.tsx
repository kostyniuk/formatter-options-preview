import { Moon, Sun } from 'lucide-react'
import { useRouter } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { setThemeServerFn } from '@/lib/theme'
import { Route } from '@/routes/__root'

type Theme = 'light' | 'dark'

export function ThemeToggle() {
  // Infer theme from cookie via root loader data
  const { theme } = Route.useLoaderData()
  const router = useRouter()

  const toggleTheme = async () => {
    const newTheme: Theme = theme === 'light' ? 'dark' : 'light'
    
    // Update DOM immediately for instant feedback
    document.documentElement.classList.remove('light', 'dark')
    document.documentElement.classList.add(newTheme)
    document.documentElement.style.colorScheme = newTheme

    // Persist to cookie via server function
    await setThemeServerFn({ data: newTheme })
    
    // Invalidate router to refetch loader data (which reads from cookie)
    router.invalidate()
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="h-9 w-9"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
    </Button>
  )
}
