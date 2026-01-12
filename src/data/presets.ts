
export interface Preset {
  id: string
  name: string
  description: string
  values: Record<string, string | boolean | number | Record<string, any>>
}

export const presets: Preset[] = [
  {
    id: 'default',
    name: 'Default',
    description: 'Standard Prettier/Oxfmt defaults',
    values: {},
  },
  {
    id: 'ultracite',
    name: 'Ultracite',
    description: 'Highly opinionated, zero-configuration preset',
    values: {

      "printWidth": 80,

      "tabWidth": 2,
      
      "useTabs": false,
      
      "semi": true,
      
      "singleQuote": false,
      
      "quoteProps": "as-needed",
      
      "jsxSingleQuote": false,
      
      "trailingComma": "es5",
      
      "bracketSpacing": true,
      
      "bracketSameLine": false,
      
      "arrowParens": "always",
      
      "endOfLine": "lf",
      
      "experimentalSortPackageJson": true,
      
      "experimentalSortImports": {
        "ignoreCase": true,
        "newlinesBetween": true,
        "order": "asc",
      },
    },
  },
]
