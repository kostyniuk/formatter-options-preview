import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'
import { Analytics } from '@vercel/analytics/react';

import Header from '../components/Header'
import { GitHubIcon, TwitterIcon } from '../components/icons'
import { SelectedValuesProvider } from '../components/SelectedValuesContext'

import appCss from '../styles.css?url'
import { getThemeServerFn } from '@/lib/theme';

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'Mellowfmt',
      },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appCss,
      },
      {
        rel: 'icon',
        href: '/favicon.svg',
        type: 'image/svg+xml',
      },
    ],
  }),
  loader: async () => {
    const theme = await getThemeServerFn()
    return { theme }
  },
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  const { theme } = Route.useLoaderData()
  return (
    <html lang="en" suppressHydrationWarning className={theme}>
      <head>
        <HeadContent />
      </head>
      <body>
        <Analytics />
        <SelectedValuesProvider>
          <Header />
          {children}
        </SelectedValuesProvider>
        <footer className="relative z-10 flex-shrink-0 h-14 flex items-center justify-center text-center text-muted-foreground text-sm bg-background/60 backdrop-blur-xl border-t border-border">
          <div className="container mx-auto flex items-center justify-center gap-4">
            <p>© 2026 Mellowfmt. All rights reserved.</p>
            <div className="flex items-center gap-3">
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
            </div>
          </div>
        </footer>
        <TanStackDevtools
          config={{
            position: 'bottom-right',
          }}
          plugins={[
            {
              name: 'Tanstack Router',
              render: <TanStackRouterDevtoolsPanel />,
            },
          ]}
        />
        <Scripts />
      </body>
    </html>
  )
}
