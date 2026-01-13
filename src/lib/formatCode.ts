import { createServerFn } from '@tanstack/react-start'
import { format } from 'oxfmt'
import type {FormatOptions} from 'oxfmt'

interface FormatInput {
  code: string
  experimentalSortImports?: {
    ignoreCase?: boolean
    newlinesBetween?: boolean
    order?: 'asc' | 'desc'
  } | false
}

type FileImportOptions = FormatOptions['experimentalSortImports']

export const formatCode = createServerFn({ method: 'POST' })
  .inputValidator((data: FormatInput) => data)
  .handler(async ({ data }) => {
    const { code, experimentalSortImports } = data

    const options: FormatOptions = {}

    if (experimentalSortImports && typeof experimentalSortImports === 'object') {
      options.experimentalSortImports = experimentalSortImports
    }

    try {
      const result = await format('example.ts', code, options)
      return { code: result.code, error: null }
    } catch (error) {
      return { code, error: String(error) }
    }
  })
