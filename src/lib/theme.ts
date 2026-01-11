import { createServerFn } from '@tanstack/react-start'
import { getCookie, setCookie } from '@tanstack/react-start/server'

type Theme = 'light' | 'dark'

export const getThemeServerFn = createServerFn({
  method: 'GET',
}).handler(async () => {
  return (getCookie('theme') as Theme) || 'light'
})

export const setThemeServerFn = createServerFn({ method: 'POST' })
  .inputValidator((input: Theme) => input)
  .handler(async ({ data }) => {
    setCookie('theme', data)
    return data
  })
